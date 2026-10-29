import Image from "next/image";

type Props = {
  eyebrow: string;
  title: string;
  /** Second line of the title, rendered in a muted tone. */
  titleMuted?: string;
  description: string;
  image: string;
  children?: React.ReactNode;
};

/**
 * Shared hero for all inner marketing pages.
 * Server component — no client JS required.
 */
export function PageHero({
  eyebrow,
  title,
  titleMuted,
  description,
  image,
  children,
}: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950">
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={image}
          alt=""
          fill
          priority
          quality={84}
          sizes="100vw"
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-950/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-ink-950/30" />
        <div className="absolute inset-0 bg-grid-faint bg-grid opacity-35" />
      </div>

      <div className="relative shell pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-48">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-electric-400" aria-hidden />
            <span className="eyebrow-dark">{eyebrow}</span>
          </div>

          <h1 className="mt-7 font-display text-display-lg font-semibold text-white">
            {title}
            {titleMuted && (
              <>
                <br className="hidden sm:block" />{" "}
                <span className="text-white/40">{titleMuted}</span>
              </>
            )}
          </h1>

          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/60">
            {description}
          </p>

          {children}
        </div>
      </div>
    </section>
  );
}
