"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";
import {
  enquirySchema,
  propertyTypes,
  serviceOptions,
  cameraCountOptions,
  type EnquiryInput,
} from "@/lib/enquiry-schema";
import { business, whatsappLink } from "@/config/business";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

export function EnquiryForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      propertyType: "",
      location: "",
      service: "",
      cameraCount: "",
      message: "",
    },
  });

  const onSubmit = async (values: EnquiryInput) => {
    setStatus("loading");
    setServerError(null);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null;

      if (!res.ok || !data?.ok) {
        setStatus("error");
        setServerError(
          data?.message ??
            "We could not submit your enquiry right now. Please call or WhatsApp us instead."
        );
        return;
      }

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setServerError(
        "We could not reach the server. Please check your connection, or contact us on WhatsApp."
      );
    }
  };

  /* --- Success state --------------------------------------------------- */
  if (status === "success") {
    return (
      <motion.div
        className="rounded-lg border border-signal-500/25 bg-signal-500/[0.06] p-8 text-center sm:p-10"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE.outExpo }}
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="mx-auto size-10 text-signal-500" aria-hidden />
        <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.006em] text-ink-950">
          Enquiry received
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-ink-600">
          Thank you. We have your details and will get back to you shortly. For
          anything urgent, message us directly on WhatsApp.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappLink(
              "Hi, I just submitted an enquiry on your website.",
              business.name
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-sm"
          >
            <MessageCircle className="size-4" aria-hidden />
            Message Us
          </a>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="btn btn-outline btn-sm"
          >
            Send another enquiry
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn(
        "rounded-lg border border-ink-950/8 bg-white",
        compact ? "p-6 sm:p-8" : "p-6 sm:p-9 lg:p-11"
      )}
    >
      {/* --- Error banner ---------------------------------------------- */}
      {status === "error" && serverError && (
        <motion.div
          className="mb-7 flex items-start gap-3 rounded-md border border-red-500/25 bg-red-50 p-4"
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          role="alert"
        >
          <AlertCircle className="mt-0.5 size-4.5 shrink-0 text-red-600" aria-hidden />
          <p className="text-[14px] leading-relaxed text-red-800">{serverError}</p>
        </motion.div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <Field
          label="Your name"
          error={errors.name?.message}
          required
          className="sm:col-span-1"
        >
          <input
            type="text"
            autoComplete="name"
            placeholder="Full name"
            aria-invalid={!!errors.name}
            className={inputClass(!!errors.name)}
            {...register("name")}
          />
        </Field>

        {/* Phone */}
        <Field
          label="Phone number"
          error={errors.phone?.message}
          required
          className="sm:col-span-1"
        >
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            aria-invalid={!!errors.phone}
            className={inputClass(!!errors.phone)}
            {...register("phone")}
          />
        </Field>

        {/* Email */}
        <Field label="Email (optional)" error={errors.email?.message}>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            className={inputClass(!!errors.email)}
            {...register("email")}
          />
        </Field>

        {/* Property type */}
        <Field label="Property type" error={errors.propertyType?.message} required>
          <select
            aria-invalid={!!errors.propertyType}
            className={inputClass(!!errors.propertyType)}
            defaultValue=""
            {...register("propertyType")}
          >
            <option value="" disabled>
              Select property type
            </option>
            {propertyTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        {/* Location */}
        <Field label="Area in Hyderabad" error={errors.location?.message} required>
          <input
            type="text"
            placeholder="e.g. Banjara Hills, Gachibowli"
            aria-invalid={!!errors.location}
            className={inputClass(!!errors.location)}
            {...register("location")}
          />
        </Field>

        {/* Service */}
        <Field label="What do you need?" error={errors.service?.message} required>
          <select
            aria-invalid={!!errors.service}
            className={inputClass(!!errors.service)}
            defaultValue=""
            {...register("service")}
          >
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        {/* Camera count */}
        <Field label="Approx. cameras" error={errors.cameraCount?.message}>
          <select
            aria-invalid={!!errors.cameraCount}
            className={inputClass(!!errors.cameraCount)}
            defaultValue=""
            {...register("cameraCount")}
          >
            <option value="">Select an option</option>
            {cameraCountOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        {/* Message */}
        <Field
          label="Anything else we should know?"
          error={errors.message?.message}
          className="sm:col-span-2"
        >
          <textarea
            rows={4}
            placeholder="Tell us about the property, what you want covered, or the problem you're facing."
            aria-invalid={!!errors.message}
            className={cn(inputClass(!!errors.message), "resize-y")}
            {...register("message")}
          />
        </Field>
      </div>

      {/* --- Submit ------------------------------------------------------ */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn btn-primary w-full sm:w-auto"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            "Request My Quote"
          )}
        </button>

        <p className="text-[13px] text-ink-500">
          Prefer to talk?{" "}
          <a
            href={whatsappLink("Hi, I'd like to discuss a CCTV project.")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ink-800 underline underline-offset-4 hover:text-electric-600"
          >
            WhatsApp us
          </a>{" "}
          or{" "}
          <a
            href={`tel:+${business.phoneNumber.replace(/\D/g, "")}`}
            className="font-medium text-ink-800 underline underline-offset-4 hover:text-electric-600"
          >
            call {business.phoneDisplay}
          </a>
          .
        </p>
      </div>
    </form>
  );
}

/* ==========================================================================
   Field helpers
   ========================================================================== */

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-md border bg-white px-4 py-3 text-[15px] text-ink-900",
    "placeholder:text-ink-400",
    "transition-colors duration-200",
    "focus:border-electric-500 focus:ring-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-500/40",
    hasError
      ? "border-red-400 bg-red-50/40"
      : "border-ink-950/12 hover:border-ink-950/25"
  );
}

function Field({
  label,
  error,
  required,
  className,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-ink-600">
        {label}
        {required && <span className="ml-1 text-electric-600">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-[13px] text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
