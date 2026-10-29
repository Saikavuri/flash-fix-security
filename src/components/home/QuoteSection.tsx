"use client";

import { motion } from "framer-motion";
import { useReveal } from "@/components/motion/useReveal";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { business } from "@/config/business";

export function QuoteSection() {
  const reveal = useReveal();

  return (
    <section id="quote" className="scroll-mt-24 bg-bone-100">
      <div className="shell py-section">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* --- Intro ---------------------------------------------------- */}
          <div className="lg:col-span-4">
            <motion.div
              className="flex items-center gap-3"
                          {...reveal({ opacity: 0, y: 14 }, { opacity: 1, y: 0 }, { delay: 0, duration: 0.6 })}>
              <span className="h-px w-10 bg-electric-500" aria-hidden />
              <span className="eyebrow">Free quotation</span>
            </motion.div>

            <motion.h2
              className="mt-6 font-display text-display-md font-semibold text-ink-950"
            {...reveal({ opacity: 0, y: 24 }, { opacity: 1, y: 0 }, { delay: 0.06, duration: 0.7 })}>
              Tell us what you need covered.
            </motion.h2>

            <motion.p
              className="mt-5 text-[16px] leading-relaxed text-ink-600"
            {...reveal({ opacity: 0, y: 18 }, { opacity: 1, y: 0 }, { delay: 0.12, duration: 0.7 })}>
              Every installation is quoted after a site assessment, so the number
              reflects your property — not a generic per-camera rate.
            </motion.p>

            <motion.dl
              className="mt-9 space-y-5 border-t border-ink-950/10 pt-8"
            {...reveal({ opacity: 0, y: 18 }, { opacity: 1, y: 0 }, { delay: 0.18, duration: 0.7 })}>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
                  Service area
                </dt>
                <dd className="mt-1.5 text-[15px] text-ink-800">
                  {business.city}, {business.region} &amp; surrounding areas
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
                  Response
                </dt>
                <dd className="mt-1.5 text-[15px] text-ink-800">
                  We call back to confirm the site visit and requirements.
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
                  Next step
                </dt>
                <dd className="mt-1.5 text-[15px] text-ink-800">
                  Written quotation covering equipment, cabling, installation and support.
                </dd>
              </div>
            </motion.dl>
          </div>

          {/* --- Form ----------------------------------------------------- */}
          <motion.div
            className="lg:col-span-8"
                        {...reveal({ opacity: 0, y: 28 }, { opacity: 1, y: 0 }, { delay: 0, duration: 0.8 })}>
            <EnquiryForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
