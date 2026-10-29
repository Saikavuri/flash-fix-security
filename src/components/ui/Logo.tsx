import { cn } from "@/lib/utils";

/**
 * Flash Fix brand mark.
 *
 * A circular badge echoing the Flash Fix COMSEC identity — an electric-blue
 * ring holding a bold "F" with a lens dot at its centre.
 *
 * The mark is self-contained (it does not inherit `currentColor`) so the
 * brand colours stay identical on every surface.
 */
const MARK = (
  <svg
    viewBox="0 0 32 32"
    className="size-full"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="13.4" stroke="#2E6BFF" strokeWidth="2" />
    <circle cx="16" cy="16" r="10.8" stroke="#2E6BFF" strokeWidth="0.7" opacity="0.45" />
    <path d="M11.4 8.6h9.6v3.2h-6.1v3.1h5.3v3.2h-5.3v5.3h-3.5V8.6Z" fill="#FFFFFF" />
    <circle cx="16" cy="16" r="1.9" fill="#2E6BFF" />
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
};

export function Logo({
  className,
  withWordmark = false,
  name,
  tagline,
  tone = "light",
}: Props) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "inline-flex size-10 shrink-0 items-center justify-center rounded-md",
          tone === "light"
            ? "bg-white/[0.06] ring-1 ring-inset ring-white/15"
            : "bg-ink-950/[0.04] ring-1 ring-inset ring-ink-950/10"
        )}
      >
        {MARK}
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

/**
 * Compact standalone mark — used in the header and footer, where the
 * wordmark is rendered separately.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center rounded-md",
        className
      )}
      aria-hidden
    >
      {MARK}
    </span>
  );
}
