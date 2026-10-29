"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useReveal } from "@/components/motion/useReveal";
import { ShieldCheck, Wrench, Headset, ArrowRight } from "lucide-react";
import { trustPillars, servicePillars } from "@/data/site";
import { business, whatsappLink } from "@/config/business";

export function TrustSection() {
  const reveal = useReveal();

  return (
    <section id="maintenance" className="relative bg-white">
      <div className="shell py-section">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* --- Media --------------------------------------------------- */}
          <motion.div
            className="lg:col-span-5"
                        {...reveal({ opacity: 0, y: 30 }, { opacity: 1, y: 0 }, { delay: 0, duration: 0.8 })}>
            <div className="media aspect-[4/5] w-full rounded-lg">
              <Image
                src="/images/trust/maintenance.jpg"
                alt="Engineer performing scheduled preventive maintenance on a security camera"
                fill
                quality={84}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="size-full object-cover"
              />
            </div>

            {/* Floating stat panel */}
            <div className="relative z-10 mx-auto -mt-12 w-[88%] rounded-lg border border-ink-950/8 bg-white p-6 shadow-lift-lg sm:w-[80%] lg:w-[84%]">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-electric-50 text-electric-600">
                  <ShieldCheck className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="font-display text-base font-semibold tracking-[-0.006em] text-ink-950">
                    AMC &amp; Maintenance
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">
                    Preventive, not reactive
                  </p>
                </div>
              </div>
              <p className="mt-4 text-[14.5px] leading-relaxed text-ink-600">
                Scheduled visits that clean lenses, verify alignment, and confirm
                recording and storage health — before footage is ever needed.
              </p>
            </div>
          </motion.div>

          {/* --- Copy ---------------------------------------------------- */}
          <div className="lg:col-span-7 lg:pl-6">
            <motion.div
              className="flex items-center gap-3"
                          {...reveal({ opacity: 0, y: 14 }, { opacity: 1, y: 0 }, { delay: 0, duration: 0.6 })}>
              <span className="h-px w-10 bg-electric-500" aria-hidden />
              <span className="eyebrow">Support &amp; maintenance</span>
            </motion.div>

            <motion.h2
              className="mt-6 font-display text-display-lg font-semibold text-ink-950"
            {...reveal({ opacity: 0, y: 24 }, { opacity: 1, y: 0 }, { delay: 0.06, duration: 0.7 })}>
              A system is only as good
              <br className="hidden sm:block" />{" "}
              <span className="text-ink-400">as its worst day.</span>
            </motion.h2>

            <motion.p
              className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-ink-600"
            {...reveal({ opacity: 0, y: 20 }, { opacity: 1, y: 0 }, { delay: 0.12, duration: 0.6 })}>
              Cameras drift out of alignment, lenses fog, connectors corrode and
              storage fills up. A planned maintenance programme catches these
              quietly, long before an incident needs the recording.
            </motion.p>

            {/* Pillars */}
            <ul className="mt-10 space-y-7">
              {trustPillars.map((pillar, i) => (
                <motion.li
                  key={pillar.title}
                  className="flex gap-5"
            {...reveal({ opacity: 0, y: 20 }, { opacity: 1, y: 0 }, { delay: 0, duration: 0.7 })}>
                  <span
                    className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-ink-950/10 text-electric-600"
                    aria-hidden
                  >
                    {i === 0 ? (
                      <Wrench className="size-4" />
                    ) : i === 1 ? (
                      <ShieldCheck className="size-4" />
                    ) : (
                      <Headset className="size-4" />
                    )}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-[-0.006em] text-ink-950">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-ink-600">
                      {pillar.copy}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-10 flex flex-wrap gap-3"
            {...reveal({ opacity: 0, y: 18 }, { opacity: 1, y: 0 }, { delay: 0.2, duration: 0.6 })}>
              <a
                href={whatsappLink(
                  "Hi, I'd like to discuss an AMC / maintenance plan.",
                  business.name
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp group"
              >
                Discuss Maintenance
                <ArrowRight
                  className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                  aria-hidden
                />
              </a>
              <a href="#quote" className="btn btn-outline">
                Request a Visit
              </a>
            </motion.div>
          </div>
        </div>

        {/* --- Service pillars strip -------------------------------------- */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-lg border border-ink-950/8 bg-ink-950/8 sm:grid-cols-3 lg:mt-28">
          {servicePillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                className="bg-white p-8"
            {...reveal({ opacity: 0, y: 20 }, { opacity: 1, y: 0 }, { delay: 0, duration: 0.6 })}>
                <Icon className="size-5 text-electric-600" aria-hidden />
                <h3 className="mt-5 font-display text-lg font-semibold tracking-[-0.006em] text-ink-950">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-600">
                  {pillar.copy}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
