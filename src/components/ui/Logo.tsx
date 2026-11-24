import Image from "next/image";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/images/brand/logo.png";

type Props = {
  className?: string;
  /** Wordmark line beside the mark (tagline only — brand text is in the logo artwork). */
  withWordmark?: boolean;
  /** Shown beside the mark when `withWordmark` is set (e.g. “CCTV Systems”). */
  tagline?: string;
  /** Light surfaces (white text) vs dark surfaces (ink text). */
  tone?: "light" | "dark";
  /** Optional pixel height for the mark (default 48). */
  size?: number;
};

export function Logo({
  className,
  withWordmark = false,
  tagline,
  tone = "light",
  size = 48,
}: Props) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
          tone === "light"
            ? "shadow-[0_0_0_1px_rgba(255,255,255,0.14)]"
            : "shadow-[0_0_0_1px_rgba(7,9,14,0.1)]"
        )}
        style={{ width: size, height: size }}
      >
        <Image
          src={LOGO_SRC}
          alt="Flash Fix Computers & Security Systems"
          width={size}
          height={size}
          className="size-full object-cover"
          priority
        />
      </span>

      {withWordmark && tagline && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-mono text-[10px] uppercase tracking-[0.2em]",
              tone === "light" ? "text-white/55" : "text-ink-500"
            )}
          >
            {tagline}
          </span>
        </span>
      )}
    </span>
  );
}

/** Compact standalone mark — header, footer, and loading states. */
export function LogoMark({ className, size = 44 }: { className?: string; size?: number }) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
        className
      )}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <Image
        src={LOGO_SRC}
        alt=""
        width={size}
        height={size}
        className="size-full object-cover"
      />
    </span>
  );
}