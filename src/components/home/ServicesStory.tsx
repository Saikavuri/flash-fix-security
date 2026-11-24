"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useReveal } from "@/components/motion/useReveal";
import { ArrowRight, MessageCircle } from "lucide-react";
import { services } from "@/data/site";
import { business, whatsappLink } from "@/config/business";
import { cn } from "@/lib/utils";

export function ServicesStory() {
  const reveal = useReveal();

  return (
    <section id="services" className="bg-white">
      <div className="shell py-section">
        {/* --- Section header -------------------------------------------- */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <motion.div
              className="flex items-center gap-3"
                          {...reveal({ opacity: 0, y: 14 }, { opacity: 1, y: 0 }, { delay: 0, duration: 0.6 })}>
              <span className="h-px w-10 bg-electric-500" aria-hidden />
              <span className="eyebrow">What we do</span>
            </motion.div>

            <motion.h2
              className="mt-6 font-display text-display-lg font-semibold text-ink-950"
            {...reveal({ opacity: 0, y: 24 }, { opacity: 1, y: 0 }, { delay: 0.06, duration: 0.7 })}>
              Everything a camera system needs.
              <br className="hidden sm:block" />{" "}
              <span className="text-ink-400">From survey to support.</span>
            </motion.h2>
          </div>

          <motion.p
            className="lede lg:col-span-5 lg:pb-2"
            {...reveal({ opacity: 0, y: 20 }, { opacity: 1, y: 0 }, { delay: 0.14, duration: 0.7 })}>
            Supply, installation, repair, upgrades and maintenance handled by one
            team — so there is never a gap between who sold it, who installed it and
            who fixes it.
          </motion.p>
        </div>

        {/* --- Service blocks --------------------------------------------- */}
        <div className="mt-16 space-y-24 lg:mt-24 lg:space-y-36">
          {services.map((service, i) => {
            const flipped = i % 2 === 1;
            const Icon = service.icon;

            return (
              <article
                key={service.id}
                id={service.id}
                className="group grid scroll-mt-28 items-center gap-8 lg:grid-cols-12 lg:gap-14"
              >
                {/* Media */}
                <motion.div
                  className={cn(
                    "relative lg:col-span-7",
                    flipped ? "lg:order-2" : "lg:order-1"
                  )}
                              {...reveal({ opacity: 0, y: 40 }, { opacity: 1, y: 0 }, { delay: 0, duration: 0.85 })}>
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

                  {/* Index + icon overlay */}
                  <div className="pointer-events-none absolute left-0 top-0 flex items-center gap-3 bg-ink-950/85 px-5 py-3 backdrop-blur-md">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-white/50">
                      {service.index}
                    </span>
                    <Icon className="size-4 text-electric-400" aria-hidden />
                  </div>
                </motion.div>

                {/* Copy */}
                <motion.div
                  className={cn("lg:col-span-5", flipped ? "lg:order-1" : "lg:order-2")}
            {...reveal({ opacity: 0, y: 30 }, { opacity: 1, y: 0 }, { delay: 0.1, duration: 0.75 })}>
                  <h3 className="font-display text-display-sm font-semibold text-ink-950">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-[16.5px] leading-relaxed text-ink-600">
                    {service.description}
                  </p>

                  <ul className="mt-7 space-y-3">
                    {service.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-[15px] text-ink-700">
                        <span
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-electric-500"
                          aria-hidden
                        />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Next actions */}
                  <div className="mt-9 flex flex-wrap items-center gap-3">
                    <a
                      href="#quote"
                      className="btn btn-outline group"
                    >
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
                </motion.div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
