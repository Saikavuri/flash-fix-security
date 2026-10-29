import { z } from "zod";

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Name is too long."),
  phone: z
    .string()
    .trim()
    .min(10, "Enter a valid phone number.")
    .max(20, "Phone number is too long.")
    .regex(
      /^[+]?[\d\s\-()]{10,20}$/,
      "Enter a valid phone number."
    ),
  email: z
    .string()
    .trim()
    .max(120, "Email is too long.")
    .refine(
      (v) => v === "" || z.string().email().safeParse(v).success,
      "Enter a valid email address."
    )
    .optional()
    .or(z.literal("")),
  propertyType: z
    .string()
    .trim()
    .min(1, "Select a property type.")
    .max(60),
  location: z
    .string()
    .trim()
    .min(2, "Enter your area in Hyderabad.")
    .max(120, "Location is too long."),
  service: z
    .string()
    .trim()
    .min(1, "Select a service.")
    .max(60),
  cameraCount: z
    .string()
    .trim()
    .max(40)
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .max(1200, "Message is too long.")
    .optional()
    .or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const propertyTypes = [
  "Home / Villa",
  "Apartment / Flat",
  "Shop / Retail",
  "Office",
  "Warehouse",
  "Factory / Industrial",
  "Commercial Building",
  "Gated Community",
  "Other",
] as const;

export const serviceOptions = [
  "New Installation",
  "Product Supply Only",
  "Repair / Troubleshooting",
  "System Upgrade",
  "AMC / Maintenance",
  "Not Sure — Need Advice",
] as const;

export const cameraCountOptions = [
  "1–2 cameras",
  "3–4 cameras",
  "5–8 cameras",
  "9+ cameras",
  "Not sure yet",
] as const;
