import Image from "next/image";

type Props = {
  eyebrow: string;
  title: string;
  /** Second line of the title, rendered in a muted tone. */
  titleMuted?: string;
  description: string;
  image: string;
  /** CSS object-position for the background photograph. */
  imageFocus?: string;
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
  imageFocus = "50% 42%",
  children,
}: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950">
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={image}
          alt=""
          fill
          priority
          quality={84}
          sizes="100vw"
          className="size-full object-cover"
          style={{ objectPosition: imageFocus }}
        />
        <div className="absolute inset-0 bg-navy-950/20" />
        <div
          className="absolute inset-0 bg-[radial-gradient(85%_75%_at_72%_20%,rgba(46,107,255,0.28),transparent_58%)]"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/48 to-navy-950/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-transparent to-navy-950/10" />
        <div className="absolute inset-0 bg-grid-faint bg-grid opacity-20" />
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
                <span className="text-white/50">{titleMuted}</span>
              </>
            )}
          </h1>

          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/70">
            {description}
          </p>

          {children}
        </div>
      </div>
    </section>
  );
}