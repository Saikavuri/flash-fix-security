"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { services } from "@/data/site";
import { business, whatsappLink } from "@/config/business";
import { useReveal } from "@/components/motion/useReveal";
/**
 * Condensed services strip for the homepage.
 *
 * Shows the three highest-intent services and links out to the full
 * storytelling page for everything else — keeps the homepage short without
 * hiding any content from the site.
 */
const FEATURED = ["installation", "repair", "maintenance"];

export function ServicesCondensed() {
  const reveal = useReveal();
  const featured = services.filter((s) => FEATURED.includes(s.id));

  return (
    <section id="services" className="bg-white">
      <div className="shell py-section">
        {/* --- Header --------------------------------------------------- */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <motion.div
              className="flex items-center gap-3"
              {...reveal({ opacity: 0, y: 14 }, { opacity: 1, y: 0 }, { duration: 0.6 })}
            >
              <span className="h-px w-10 bg-electric-500" aria-hidden />
              <span className="eyebrow">What we do</span>
            </motion.div>

            <motion.h2
              className="mt-6 font-display text-display-lg font-semibold text-ink-950"
              {...reveal({ opacity: 0, y: 24 }, { opacity: 1, y: 0 }, { delay: 0.06, duration: 0.7 })}
            >
              Everything a camera system needs.
              <br className="hidden sm:block" />{" "}
              <span className="text-ink-400">From survey to support.</span>
            </motion.h2>
          </div>

          <motion.p
            className="lede lg:col-span-5 lg:pb-2"
            {...reveal({ opacity: 0, y: 20 }, { opacity: 1, y: 0 }, { delay: 0.14, duration: 0.7 })}
          >
            Supply, installation, repair, upgrades and maintenance — handled by one
            team, so nothing falls between vendors.
          </motion.p>
        </div>

        {/* --- Three featured cards -------------------------------------- */}
        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3 lg:gap-5">
          {featured.map((service, i) => {
            const Icon = service.icon;
            const focus = service.imageFocus ?? "50% 50%";
            const cardIndex = String(i + 1).padStart(2, "0");

            return (
              <motion.article
                key={service.id}
                {...reveal(
                  { opacity: 0, y: 30 },
                  { opacity: 1, y: 0 },
                  { delay: i * 0.08, duration: 0.75 }
                )}
                className="group flex flex-col overflow-hidden rounded-xl border border-ink-950/8 bg-white shadow-[0_1px_0_rgba(7,9,14,0.04)] transition-all duration-500 hover:border-electric-500/20 hover:shadow-lift-lg"
              >
                <Link
                  href={`/services#${service.id}`}
                  className="relative block outline-none focus-visible:ring-2 focus-visible:ring-electric-500 focus-visible:ring-offset-2"
                >
                  <div className="media aspect-[16/10] w-full rounded-none bg-ink-900">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      quality={84}
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="size-full object-cover transition-transform duration-[1100ms] ease-out-expo group-hover:scale-[1.05]"
                      style={{ objectPosition: focus }}
                    />
                    <div className="scrim-bottom pointer-events-none absolute inset-0" aria-hidden />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink-950/35 via-transparent to-transparent opacity-80"
                      aria-hidden
                    />
                  </div>

                  <div
                    className="pointer-events-none absolute left-0 top-0 flex items-center gap-2.5 rounded-br-xl border border-white/10 border-l-0 border-t-0 bg-ink-950/80 px-4 py-2.5 backdrop-blur-md"
                    aria-hidden
                  >
                    <span className="font-mono text-[10px] tracking-[0.2em] text-electric-300/90">
                      {cardIndex}
                    </span>
                    <span className="h-3 w-px bg-white/20" aria-hidden />
                    <Icon className="size-3.5 text-electric-400" aria-hidden />
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-7 pt-6">
                  <Link
                    href={`/services#${service.id}`}
                    className="font-display text-xl font-semibold tracking-[-0.02em] text-ink-950 transition-colors duration-300 hover:text-electric-600"
                  >
                    {service.title}
                  </Link>

                  <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${service.title} highlights`}>
                    {service.highlights.slice(0, 2).map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-ink-950/8 bg-bone-50 px-3 py-1 text-[11.5px] font-medium leading-snug text-ink-700"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-600">
                    {service.description}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ink-950/8 pt-5">
                    <a
                      href="#quote"
                      className="link-underline text-[14px] font-semibold text-ink-950"
                    >
                      Get a quote
                      <ArrowRight className="size-3.5" aria-hidden />
                    </a>
                    <a
                      href={whatsappLink(
                        `Hi, I'd like to know more about ${service.title.toLowerCase()}.`,
                        business.name
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink-950/10 bg-white px-3 py-1.5 text-[13px] font-medium text-ink-600 transition-colors duration-300 hover:border-signal-500/30 hover:text-ink-950"
                    >
                      <MessageCircle className="size-3.5 text-signal-500" aria-hidden />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* --- Link to the full services page ---------------------------- */}
        <motion.div
          className="mt-12 flex flex-col items-center justify-between gap-5 rounded-xl border border-ink-950/8 bg-bone-100 px-7 py-6 sm:flex-row"
          {...reveal({ opacity: 0, y: 18 }, { opacity: 1, y: 0 }, { duration: 0.6 })}
        >
          <div>
            <p className="font-display text-lg font-semibold tracking-[-0.02em] text-ink-950">
              Product supply, system upgrades and third-party servicing
            </p>
            <p className="mt-1 text-[14.5px] text-ink-600">
              Four more services, described in full — including what&apos;s included
              on every visit.
            </p>
          </div>
          <a href="/services" className="btn btn-outline group shrink-0">
            All services
            <ArrowRight
              className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
              aria-hidden
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}