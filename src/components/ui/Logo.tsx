import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Flash Fix brand mark — shield + CCTV lens + “F” with flash accent.
 * Vector source: `/logo.svg` (also exported as PNG in `/images/brand/`).
 */
const MARK_SVG = (
  <svg viewBox="0 0 48 48" className="size-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ff-logo-ring" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6B96FF" />
        <stop offset={1} stopColor="#2E6BFF" />
      </linearGradient>
      <linearGradient id="ff-logo-shine" x1="14" y1="10" x2="34" y2="38" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" stopOpacity={0.14} />
        <stop offset={1} stopColor="#FFFFFF" stopOpacity={0} />
      </linearGradient>
    </defs>
    <rect width="48" height="48" rx="12" fill="#0A1020" />
    <rect
      x={1}
      y={1}
      width={46}
      height={46}
      rx={11}
      stroke="url(#ff-logo-ring)"
      strokeWidth={1.25}
      opacity={0.9}
    />
    <path
      d="M24 10.5 33.25 14.75v9.1c0 5.4-4.05 8.85-9.25 10.45-5.2-1.6-9.25-5.05-9.25-10.45v-9.1L24 10.5Z"
      stroke="#2E6BFF"
      strokeWidth={1.65}
      fill="url(#ff-logo-shine)"
    />
    <circle cx={24} cy={23.25} r={7.25} stroke="#2E6BFF" strokeWidth={1} opacity={0.5} />
    <circle cx={24} cy={23.25} r={2.35} fill="#2E6BFF" />
    <path
      d="M18.25 16.1h9.1v2.55H21.6v2.35h4.95v2.55H21.6v5.35h-3.35V16.1Z"
      fill="#FFFFFF"
    />
    <path
      d="M31.2 13.2 29.9 16.4h1.95l-2.65 1.05 1.05-3.55h-1.95l1.8-1.3Z"
      fill="#6B96FF"
      opacity={0.95}
    />
  </svg>
);

type Props = {
  className?: string;
  /** Show the wordmark next to the mark. */
  withWordmark?: boolean;
  /** Business name — falls back to the configured value. */
  name?: string;
  tagline?: string;
  /** Light surfaces (white text) vs dark surfaces (ink text). */
  tone?: "light" | "dark";
  /** Use raster mark from `/images/brand/logo-mark.png` when set (e.g. share cards). */
  useRasterMark?: boolean;
};

export function Logo({
  className,
  withWordmark = false,
  name,
  tagline,
  tone = "light",
  useRasterMark = false,
}: Props) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "relative inline-flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-[11px]",
          tone === "light"
            ? "shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
            : "shadow-[0_0_0_1px_rgba(7,9,14,0.08)]"
        )}
      >
        {useRasterMark ? (
          <Image
            src="/images/brand/logo-mark.png"
            alt=""
            width={44}
            height={44}
            className="size-full object-cover"
            priority
          />
        ) : (
          MARK_SVG
        )}
      </span>

      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-[15px] font-semibold tracking-[-0.006em]",
              tone === "light" ? "text-white" : "text-ink-950"
            )}
          >
            {name}
          </span>
          {tagline && (
            <span
              className={cn(
                "mt-1 font-mono text-[10px] uppercase tracking-[0.2em]",
                tone === "light" ? "text-white/45" : "text-ink-500"
              )}
            >
              {tagline}
            </span>
          )}
        </span>
      )}
    </span>
  );
}

/** Compact standalone mark — header, footer, and loading states. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-[11px]",
        className
      )}
      aria-hidden
    >
      {MARK_SVG}
    </span>
  );
}