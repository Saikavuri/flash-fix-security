/**
 * ============================================================================
 * BUSINESS CONFIG — single source of truth
 * ============================================================================
 * Edit ONLY this file to update business details across the entire site.
 * Every WhatsApp link, click-to-call link, address, service area and
 * business hour on the website is generated from the values below.
 *
 * Fields marked REPLACE_* still need the real value — see README.md →
 * "Setup requirements".
 * ============================================================================
 */

export const business = {
  /** Short brand name used in the header + footer */
  name: "Flash Fix Computers & Security Systems",

  /** Full legal / trading name used in metadata + footer */
  legalName: "Flash Fix Computers & Security Systems",

  /** Tagline shown under the logo in the header */
  tagline: "CCTV Systems",

  /** City / primary service region */
  city: "Hyderabad",
  region: "Telangana",

  /**
   * WhatsApp number in international format, digits only, no "+", no spaces.
   */
  whatsappNumber: "919030546555",

  /**
   * Click-to-call number in international format, digits only, no "+".
   */
  phoneNumber: "919030546555",

  /** Human-readable phone for display */
  phoneDisplay: "+91 90305 46555",

  email: "flashfixhyd1@gmail.com",

  /** Shop / office address */
  address: {
    line1: "Block C 1-57/10C, Plot No 10C, 3rd St",
    line2: "Kondapur, Sri Ram Nagar",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500084",
    country: "India",
  },

  /** Business hours — keep in sync with Google Business Profile */
  hours: [
    { days: "Monday – Saturday", time: "9:00 AM – 8:00 PM" },
    { days: "Sunday", time: "9:00 AM – 6:00 PM" },
  ],

  /**
   * Verified Hyderabad service areas.
   * These appear in the footer and on the contact page.
   */
  serviceAreas: [
    "Kondapur",
    "Gachibowli",
    "Madhapur",
    "HITEC City",
    "Miyapur",
    "Kukatpally",
    "Banjara Hills",
    "Jubilee Hills",
  ],

  /** Google Maps link for the "Get directions" action */
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Block+C+1-57%2F10C%2C+Plot+No+10C%2C+3rd+St%2C+Kondapur%2C+Sri+Ram+Nagar%2C+Hyderabad%2C+Telangana+500084",

  /** Social profiles — leave empty strings to hide the icon entirely */
  social: {
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
  },

  /** Years in business — used only if you have a verifiable figure */
  yearsInBusiness: null as number | null,

  /** GST / registration identifiers — optional */
  gstNumber: "",
} as const;

/* ==========================================================================
   Derived helpers
   ========================================================================== */

/** Strip every non-digit character from a phone-ish string. */
const digitsOnly = (value: string) => value.replace(/\D/g, "");

/**
 * Build a WhatsApp deep link with an optional prefilled, URL-encoded message.
 * `context` is appended so the message says what the visitor was looking at.
 */
export function whatsappLink(message?: string, context?: string): string {
  const number = digitsOnly(business.whatsappNumber);
  const base = `https://wa.me/${number}`;

  const parts = [message, context].filter(Boolean).join("\n\n");
  if (!parts) return base;

  return `${base}?text=${encodeURIComponent(parts)}`;
}

/** Build a `tel:` link. */
export function telLink(): string {
  return `tel:+${digitsOnly(business.phoneNumber)}`;
}

/** Full formatted address string. */
export const formattedAddress = [
  business.address.line1,
  business.address.line2,
  `${business.address.city}, ${business.address.state} ${business.address.pincode}`,
  business.address.country,
]
  .filter(Boolean)
  .join(", ");

export type Business = typeof business;
