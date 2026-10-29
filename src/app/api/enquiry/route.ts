import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiry-schema";
import { business } from "@/config/business";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Enquiry endpoint.
 *
 * The enquiry is written to `data/enquiries.json` on the server so it is a
 * real, verifiable submission — the client only shows a success state when
 * this route confirms persistence.
 *
 * For production, set `ENQUIRY_WEBHOOK_URL` to forward the enquiry to a CRM,
 * Google Sheet, email service, or any other sink. When the webhook is not
 * configured, the local file store is used and the enquiry is still real.
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
        // Persist locally as a fallback so the enquiry is never lost.
        await persistLocally(enquiry);
        return NextResponse.json(
          {
            ok: true,
            id: enquiry.id,
            message: "Enquiry received and saved.",
          },
          { status: 201 }
        );
      }
    } else {
      await persistLocally(enquiry);
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
