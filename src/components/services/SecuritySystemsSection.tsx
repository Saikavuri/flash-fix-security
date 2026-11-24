"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { securitySystems } from "@/data/site";
import { business, whatsappLink } from "@/config/business";
import { contactQuoteHref } from "@/config/navigation";
import { useReveal } from "@/components/motion/useReveal";

export function SecuritySystemsSection() {
  const reveal = useReveal();

  return (
    <section id="security-systems" className="border-t border-ink-950/8 bg-bone-100">
      <div className="shell py-section">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <motion.div
              className="flex items-center gap-3"
              {...reveal({ opacity: 0, y: 14 }, { opacity: 1, y: 0 }, { duration: 0.6 })}
            >
              <span className="h-px w-10 bg-electric-500" aria-hidden />
              <span className="eyebrow">Security systems</span>
            </motion.div>

            <motion.h2
              className="mt-6 font-display text-display-lg font-semibold text-ink-950"
              {...reveal({ opacity: 0, y: 24 }, { opacity: 1, y: 0 }, { delay: 0.06, duration: 0.7 })}
            >
              Beyond cameras —
              <br className="hidden sm:block" />{" "}
              <span className="text-ink-400">the full stack on one quote.</span>
            </motion.h2>
          </div>

          <motion.p
            className="lede lg:col-span-5 lg:pb-2"
            {...reveal({ opacity: 0, y: 20 }, { opacity: 1, y: 0 }, { delay: 0.14, duration: 0.7 })}
          >
            CCTV plus biometric, access control, fire alarm, smoke detection and panic
            alerting — supplied and installed with genuine equipment and on-site
            commissioning.
          </motion.p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {securitySystems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.id}
                id={item.id}
                className="scroll-mt-28"
                {...reveal(
                  { opacity: 0, y: 22 },
                  { opacity: 1, y: 0 },
                  { delay: (i % 3) * 0.06, duration: 0.65 }
                )}
              >
                <article className="flex h-full flex-col rounded-xl border border-ink-950/8 bg-white p-6 shadow-[0_1px_0_rgba(7,9,14,0.04)] transition-colors duration-300 hover:border-electric-500/25">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-ink-950/8 bg-bone-50 text-electric-600">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <motion.h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-ink-950">
                      {item.title}
                    </motion.h3>
                  </div>
                  <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-ink-600">
                    {item.summary}
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-ink-950/8 pt-4">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-[13.5px] text-ink-700"
                      >
                        <span
                          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-electric-500"
                          aria-hidden
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="link-underline text-[13.5px] font-semibold text-ink-950"
                      >
                        View range
                        <ArrowRight className="size-3.5" aria-hidden />
                      </Link>
                    ) : (
                      <a
                        href={contactQuoteHref}
                        className="link-underline text-[13.5px] font-semibold text-ink-950"
                      >
                        Get a quote
                        <ArrowRight className="size-3.5" aria-hidden />
                      </a>
                    )}
                    <a
                      href={whatsappLink(
                        `Hi, I'd like a quote for ${item.title}.`,
                        business.name
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-600 hover:text-ink-950"
                    >
                      <MessageCircle className="size-3.5 text-signal-500" aria-hidden />
                      WhatsApp
                    </a>
                  </div>
                </article>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}