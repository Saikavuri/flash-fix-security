"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useReveal } from "@/components/motion/useReveal";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { business, telLink, whatsappLink } from "@/config/business";
import { contactQuoteHref } from "@/config/navigation";

type ClosingCtaProps = {
  /** Where “Get a Free Quote” scrolls or navigates — use `#quote` on home only. */
  quoteCtaHref?: string;
};

export function ClosingCta({ quoteCtaHref = contactQuoteHref }: ClosingCtaProps) {
  const reveal = useReveal();

  return (
    <section className="relative isolate overflow-hidden bg-navy-950">
      {/* Background */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/images/cta/closing.jpg"
          alt=""
          fill
          quality={82}
          sizes="100vw"
          className="size-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-navy-950/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/40" />
        <div className="absolute inset-0 bg-grid-faint bg-grid opacity-40" />
      </div>

      <div className="relative shell py-section">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            className="flex items-center justify-center gap-3"
                        {...reveal({ opacity: 0, y: 14 }, { opacity: 1, y: 0 }, { delay: 0, duration: 0.6 })}>
            <span className="h-px w-10 bg-electric-400" aria-hidden />
            <span className="eyebrow-dark">Start the conversation</span>
            <span className="h-px w-10 bg-electric-400" aria-hidden />
          </motion.div>

          <motion.h2
            className="mt-7 font-display text-display-lg font-semibold text-white"
            {...reveal({ opacity: 0, y: 26 }, { opacity: 1, y: 0 }, { delay: 0.06, duration: 0.8 })}>
            Let&apos;s secure your property
            <br className="hidden sm:block" />{" "}
            <span className="text-white/40">properly.</span>
          </motion.h2>

          <motion.p
            className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-white/60"
            {...reveal({ opacity: 0, y: 20 }, { opacity: 1, y: 0 }, { delay: 0.14, duration: 0.8 })}>
            Share the property and what you want covered. We&apos;ll come back with a
            clear, written quotation — or talk it through on WhatsApp if that&apos;s
            easier.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            {...reveal({ opacity: 0, y: 20 }, { opacity: 1, y: 0 }, { delay: 0.22, duration: 0.8 })}>
            <a href={quoteCtaHref} className="btn btn-electric group w-full sm:w-auto">
              Get a Free Quote
              <ArrowRight
                className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                aria-hidden
              />
            </a>
            <a
              href={whatsappLink(
                "Hi, I'd like to discuss a CCTV installation for my property.",
                business.name
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full sm:w-auto"
            >
              <MessageCircle className="size-4" aria-hidden />
              Chat on WhatsApp
            </a>
            <a
              href={telLink()}
              className="btn btn-ghost-dark w-full sm:w-auto"
            >
              <Phone className="size-4" aria-hidden />
              {business.phoneDisplay}
            </a>
          </motion.div>

          <motion.p
            className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-white/35"
            {...reveal({ opacity: 0 }, { opacity: 1 }, { delay: 0.3, duration: 0.8 })}>
            Serving {business.city} &amp; surrounding areas
          </motion.p>
        </div>
      </div>
    </section>
  );
}
