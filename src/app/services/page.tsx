import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { pageHeroImages } from "@/config/page-heroes";
import { Reveal } from "@/components/motion/Reveal";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { services } from "@/data/site";
import { contactQuoteHref } from "@/config/navigation";
import { business, whatsappLink } from "@/config/business";

export const metadata: Metadata = {
  title: "CCTV Services — Installation, Supply, Repair & AMC in Hyderabad",
  description:
    "CCTV installation, product supply, repair, system upgrades and AMC maintenance across Hyderabad. Surveyed, installed and supported by one team.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="One team for"
        titleMuted="the whole lifecycle."
        description="Supply, installation, repair, upgrades and maintenance — handled by the same people, so nothing falls between vendors."
        image={pageHeroImages.services.src}
        imageFocus={pageHeroImages.services.focus}
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <a href={contactQuoteHref} className="btn btn-electric group">
            Get a Free Quote
            <ArrowRight
              className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
              aria-hidden
            />
          </a>
          <a
            href={whatsappLink("Hi, I'd like to talk about CCTV services.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost-dark"
          >
            <MessageCircle className="size-4" aria-hidden />
            Chat on WhatsApp
          </a>
        </div>
      </PageHero>

      {/* --- Service blocks -------------------------------------------- */}
      <section className="bg-white">
        <div className="shell py-section">
          <div className="space-y-24 lg:space-y-32">
            {services.map((service, i) => {
              const flipped = i % 2 === 1;
              const Icon = service.icon;

              return (
                <article
                  key={service.id}
                  id={service.id}
                  className="group grid scroll-mt-28 items-center gap-8 lg:grid-cols-12 lg:gap-14"
                >
                  <Reveal
                    className={flipped ? "lg:order-2 lg:col-span-7" : "lg:col-span-7"}
                  >
                    <div className="media aspect-[4/3] w-full rounded-lg sm:aspect-[16/10]">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        quality={84}
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="size-full object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.04]"
                        style={{ objectPosition: service.imageFocus ?? "50% 50%" }}
                      />
                    </div>
                    <div className="pointer-events-none absolute left-0 top-0 flex items-center gap-3 bg-ink-950/85 px-5 py-3 backdrop-blur-md">
                      <span className="font-mono text-[11px] tracking-[0.2em] text-white/50">
                        {service.index}
                      </span>
                      <Icon className="size-4 text-electric-400" aria-hidden />
                    </div>
                  </Reveal>

                  <Reveal
                    delay={0.1}
                    className={flipped ? "lg:order-1 lg:col-span-5" : "lg:col-span-5"}
                  >
                    <h2 className="font-display text-display-sm font-semibold text-ink-950">
                      {service.title}
                    </h2>
                    <p className="mt-4 text-[16.5px] leading-relaxed text-ink-600">
                      {service.description}
                    </p>
                    <ul className="mt-7 space-y-3">
                      {service.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-3 text-[15px] text-ink-700"
                        >
                          <span
                            className="mt-2 size-1.5 shrink-0 rounded-full bg-electric-500"
                            aria-hidden
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-9 flex flex-wrap items-center gap-3">
                      <a href={contactQuoteHref} className="btn btn-outline group">
                        Request {service.shortTitle.toLowerCase()}
                        <ArrowRight
                          className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                          aria-hidden
                        />
                      </a>
                      <a
                        href={whatsappLink(
                          `Hi, I'd like to know more about ${service.title.toLowerCase()}.`,
                          business.name
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-[14px] font-medium text-ink-600 transition-colors duration-300 hover:text-ink-950"
                      >
                        <MessageCircle className="size-4 text-signal-500" aria-hidden />
                        Ask on WhatsApp
                      </a>
                    </div>
                  </Reveal>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- FAQs --------------------------------------------------------- */}
      <FaqAccordion />

      {/* --- Cross-links -------------------------------------------------- */}
      <section className="border-t border-ink-950/8 bg-bone-100">
        <div className="shell py-16">
          <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-display-sm font-semibold text-ink-950">
                Not sure which service you need?
              </h2>
              <p className="mt-2 text-[15.5px] text-ink-600">
                Tell us about the property and we will recommend a sensible setup.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/solutions" className="btn btn-outline">
                Browse solutions
              </Link>
              <Link href="/products" className="btn btn-outline">
                See products
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </>
  );
}
