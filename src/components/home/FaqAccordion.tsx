"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReveal } from "@/components/motion/useReveal";
import { Plus } from "lucide-react";
import { faqs } from "@/data/site";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  const reveal = useReveal();

  return (
    <section id="faq" className="bg-white">
      <div className="shell py-section">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* --- Header -------------------------------------------------- */}
          <div className="lg:col-span-4">
            <motion.div
              className="flex items-center gap-3"
                          {...reveal({ opacity: 0, y: 14 }, { opacity: 1, y: 0 }, { delay: 0, duration: 0.6 })}>
              <span className="h-px w-10 bg-electric-500" aria-hidden />
              <span className="eyebrow">Common questions</span>
            </motion.div>

            <motion.h2
              className="mt-6 font-display text-display-md font-semibold text-ink-950"
            {...reveal({ opacity: 0, y: 24 }, { opacity: 1, y: 0 }, { delay: 0.06, duration: 0.7 })}>
              Answers before
              <br className="hidden sm:block" />{" "}
              <span className="text-ink-400">you call us.</span>
            </motion.h2>

            <motion.p
              className="mt-6 text-[15.5px] leading-relaxed text-ink-600"
            {...reveal({ opacity: 0, y: 18 }, { opacity: 1, y: 0 }, { delay: 0.12, duration: 0.7 })}>
              Still unsure? Send us the property details on WhatsApp and we will
              suggest a sensible starting point.
            </motion.p>

            <motion.div
              className="mt-8"
            {...reveal({ opacity: 0, y: 18 }, { opacity: 1, y: 0 }, { delay: 0.18, duration: 0.7 })}>
              <a href="#quote" className="btn btn-outline group">
                Ask your question
              </a>
            </motion.div>
          </div>

          {/* --- Accordion ------------------------------------------------ */}
          <div className="lg:col-span-8">
            <ul className="border-t border-ink-950/10">
              {faqs.map((faq, i) => {
                const isOpen = open === i;
                return (
                  <motion.li
                    key={faq.question}
                    className="border-b border-ink-950/10"
                    {...reveal(
                      { opacity: 0, y: 16 },
                      { opacity: 1, y: 0 },
                      { delay: Math.min(i * 0.05, 0.25), duration: 0.5 }
                    )}
                  >
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        id={`faq-trigger-${i}`}
                        className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                      >
                        <span
                          className={cn(
                            "font-display text-[17px] font-semibold tracking-[-0.006em] transition-colors duration-300 sm:text-lg",
                            isOpen
                              ? "text-ink-950"
                              : "text-ink-800 group-hover:text-electric-600"
                          )}
                        >
                          {faq.question}
                        </span>
                        <span
                          className={cn(
                            "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-400 ease-out-expo",
                            isOpen
                              ? "rotate-45 border-ink-950 bg-ink-950 text-white"
                              : "border-ink-950/15 text-ink-500 group-hover:border-ink-950/40 group-hover:text-ink-950"
                          )}
                          aria-hidden
                        >
                          <Plus className="size-4" />
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${i}`}
                          role="region"
                          aria-labelledby={`faq-trigger-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.4,
                            ease: EASE.outExpo,
                            opacity: { duration: 0.25 },
                          }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-prose pb-7 text-[15.5px] leading-relaxed text-ink-600">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
