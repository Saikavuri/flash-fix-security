import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiry-schema";
import { business } from "@/config/business";
import { sendEnquiryEmail } from "@/lib/send-enquiry-email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Enquiry endpoint.
 *
 * The enquiry is written to `data/enquiries.json` on the server so it is a
 * real, verifiable submission — the client only shows a success state when
 * this route confirms persistence.
 *
 * Each enquiry is saved to `data/enquiries.json` and emailed to
 * `ENQUIRY_NOTIFY_EMAIL` (default: `business.email`) when Gmail SMTP env vars
 * are set. Optionally set `ENQUIRY_WEBHOOK_URL` for a CRM or Google Sheet.
 */
export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  /* --- Server-side validation ------------------------------------------ */
  const parsed = enquirySchema.safeParse(payload);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const firstError =
      Object.values(fieldErrors).flat().find(Boolean) ??
      "Please check the highlighted fields.";

    return NextResponse.json(
      { ok: false, message: firstError, fieldErrors },
      { status: 422 }
    );
  }

  const data = parsed.data;
  const enquiry = {
    id: `ENQ-${Date.now().toString(36).toUpperCase()}`,
    receivedAt: new Date().toISOString(),
    ...data,
  };

  /* --- Persist ----------------------------------------------------------- */
  try {
    const webhook = process.env.ENQUIRY_WEBHOOK_URL;

    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enquiry),
      });

      if (!res.ok) {
        await persistLocally(enquiry);
      }
    } else {
      await persistLocally(enquiry);
    }

    try {
      await sendEnquiryEmail(enquiry);
    } catch (emailError) {
      console.error("[enquiry] email notification failed:", emailError);
    }

    return NextResponse.json(
      { ok: true, id: enquiry.id, message: "Enquiry received." },
      { status: 201 }
    );
  } catch (error) {
    console.error("[enquiry] persistence failed:", error);

    // Deliberately NOT a success response — the client must show the error
    // state so the visitor does not believe their enquiry was received.
    return NextResponse.json(
      {
        ok: false,
        message:
          "We could not save your enquiry right now. Please call or WhatsApp us so we don't miss it.",
      },
      { status: 500 }
    );
  }
}

/* ==========================================================================
   Local persistence
   ========================================================================== */

async function persistLocally(enquiry: Record<string, unknown>) {
  const { promises: fs } = await import("node:fs");
  const path = await import("node:path");

  const dir = path.join(process.cwd(), "data");
  const file = path.join(dir, "enquiries.json");

  await fs.mkdir(dir, { recursive: true });

  let existing: unknown[] = [];
  try {
    const raw = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) existing = parsed;
  } catch {
    existing = [];
  }

  existing.push({ ...enquiry, source: `web:${business.city}` });

  await fs.writeFile(file, JSON.stringify(existing, null, 2), "utf8");
}
