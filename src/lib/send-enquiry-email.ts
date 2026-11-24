import nodemailer from "nodemailer";
import { business } from "@/config/business";

export type EnquiryRecord = {
  id: string;
  receivedAt: string;
  name: string;
  phone: string;
  email?: string;
  propertyType: string;
  location: string;
  service: string;
  cameraCount?: string;
  message?: string;
};

function formatEnquiryText(enquiry: EnquiryRecord): string {
  const lines = [
    `New website quotation request — ${business.name}`,
    "",
    `Reference: ${enquiry.id}`,
    `Received: ${enquiry.receivedAt}`,
    "",
    `Name: ${enquiry.name}`,
    `Phone: ${enquiry.phone}`,
    `Email: ${enquiry.email?.trim() ? enquiry.email : "—"}`,
    `Property type: ${enquiry.propertyType}`,
    `Area: ${enquiry.location}`,
    `Service needed: ${enquiry.service}`,
    `Approx. cameras: ${enquiry.cameraCount?.trim() ? enquiry.cameraCount : "—"}`,
    "",
    "Message:",
    enquiry.message?.trim() ? enquiry.message : "—",
    "",
    "—",
    "Reply by call or WhatsApp when you can.",
  ];
  return lines.join("\n");
}

function formatEnquiryHtml(enquiry: EnquiryRecord): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px 8px 0;color:#666;font-size:13px;vertical-align:top;width:140px">${label}</td><td style="padding:8px 0;font-size:14px;color:#111">${value}</td></tr>`;

  const esc = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  return `
<div style="font-family:system-ui,sans-serif;max-width:560px;color:#111">
  <h2 style="margin:0 0 8px;font-size:18px">New quotation enquiry</h2>
  <p style="margin:0 0 20px;font-size:13px;color:#666">${esc(business.name)} · ${esc(enquiry.id)}</p>
  <table style="border-collapse:collapse;width:100%">
    ${row("Name", esc(enquiry.name))}
    ${row("Phone", `<a href="tel:${esc(enquiry.phone)}">${esc(enquiry.phone)}</a>`)}
    ${row("Email", enquiry.email?.trim() ? esc(enquiry.email) : "—")}
    ${row("Property", esc(enquiry.propertyType))}
    ${row("Area", esc(enquiry.location))}
    ${row("Service", esc(enquiry.service))}
    ${row("Cameras", enquiry.cameraCount?.trim() ? esc(enquiry.cameraCount) : "—")}
  </table>
  <p style="margin:20px 0 8px;font-size:13px;color:#666">Message</p>
  <p style="margin:0;font-size:14px;line-height:1.5;white-space:pre-wrap">${esc(enquiry.message?.trim() ? enquiry.message : "—")}</p>
</div>`;
}

/**
 * Sends enquiry details to the business inbox via Gmail SMTP.
 * Requires GMAIL_USER and GMAIL_APP_PASSWORD in the environment.
 */
export async function sendEnquiryEmail(enquiry: EnquiryRecord): Promise<boolean> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to =
    process.env.ENQUIRY_NOTIFY_EMAIL?.trim() || business.email;

  if (!user || !pass) {
    console.warn(
      "[enquiry] email skipped — set GMAIL_USER and GMAIL_APP_PASSWORD in .env.local"
    );
    return false;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const subject = `New quote request — ${enquiry.name} (${enquiry.location})`;

  await transporter.sendMail({
    from: `"${business.name}" <${user}>`,
    to,
    replyTo: enquiry.email?.trim() ? enquiry.email : undefined,
    subject,
    text: formatEnquiryText(enquiry),
    html: formatEnquiryHtml(enquiry),
  });

  return true;
}