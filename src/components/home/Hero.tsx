"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle, MapPin, ShieldCheck } from "lucide-react";
import { business, whatsappLink } from "@/config/business";
import { EASE } from "@/lib/motion";

const headline = ["Security, Engineered", "Around You."];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-ink-950">
      {/* --- Background: deep navy field + faint grid --------------------- */}
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-navy-950" />
        <div className="absolute inset-0 bg-grid-faint bg-grid opacity-45" />
        <div
          className="absolute inset-0 bg-[radial-gradient(120%_90%_at_78%_18%,rgba(46,107,255,0.20),transparent_58%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(80%_60%_at_10%_95%,rgba(10,16,32,0.9),transparent_60%)]"
          aria-hidden
        />
        <div className="absolute inset-0 grain" aria-hidden />
      </div>

      <div className="relative shell grid min-h-[100svh] items-center gap-12 pb-16 pt-32 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-36">
        {/* ================= Left — copy ================= */}
        <div className="lg:col-span-6 xl:col-span-6">
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE.outExpo, delay: 0.05 }}
          >
            <span className="h-px w-10 bg-electric-400" aria-hidden />
            <span className="eyebrow-dark">Hyderabad · CCTV &amp; Security Systems</span>
          </motion.div>

          {/* Headline — line-by-line masked reveal */}
          <h1 className="mt-7 font-display text-display-xl font-semibold text-white">
            {headline.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 1,
                    ease: EASE.outExpo,
                    delay: 0.14 + i * 0.1,
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Supporting copy */}
          <motion.p
            className="mt-7 max-w-lg text-[17px] leading-relaxed text-white/60 sm:text-lg"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE.outExpo, delay: 0.55 }}
          >
            Surveillance designed around your property — installed by people who
            survey the site first, and supported long after handover.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE.outExpo, delay: 0.66 }}
          >
            <a href="#quote" className="btn btn-electric group">
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
              className="btn btn-ghost-dark"
            >
              <MessageCircle className="size-4" aria-hidden />
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* Meta row */}
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/12 pt-6"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE.outExpo, delay: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
              <MapPin className="size-3.5 text-electric-400" aria-hidden />
              {business.city}, {business.region}
            </span>
            <span className="h-3 w-px bg-white/20" aria-hidden />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
              Install · Supply · Repair · AMC
            </span>
          </motion.div>
        </div>

        {/* ================= Right — image ================= */}
        <motion.div
          className="lg:col-span-6 xl:col-span-6"
          initial={reduce ? false : { opacity: 0, scale: 0.97, x: 32 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.1, ease: EASE.outExpo, delay: 0.25 }}
        >
          <div className="group relative">
            {/* Ambient glow behind the frame — lifts it off the dark hero */}
            <div
              className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(60%_60%_at_50%_45%,rgba(46,107,255,0.32),transparent_72%)] blur-2xl"
              aria-hidden
            />

            {/* Image frame */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-navy-900 shadow-[0_40px_100px_-30px_rgba(46,107,255,0.45)] ring-1 ring-inset ring-white/12 sm:aspect-[4/4.4] lg:aspect-[3/4] xl:aspect-[4/4.2]">
              <motion.div
                className="absolute inset-0"
                initial={reduce ? false : { scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2.2, ease: EASE.outExpo, delay: 0.35 }}
              >
                <Image
                  src="/images/hero/cctv-hero.jpg"
                  alt="Close-up of a CCTV camera lens with a luminous blue iris"
                  fill
                  priority
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 44vw"
                  className="size-full object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.05]"
                />
              </motion.div>

              {/* Cinematic grade — kept light so the artwork stays visible */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-navy-950/45 via-transparent to-transparent"
                aria-hidden
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-navy-950/20 via-transparent to-transparent"
                aria-hidden
              />

              {/* Corner bracket detail */}
              <div
                className="pointer-events-none absolute inset-4 rounded border border-white/18"
                aria-hidden
              />
            </div>

            {/* Floating badge — coverage */}
            <motion.div
              className="absolute -left-3 bottom-6 flex items-center gap-3 rounded-lg border border-white/10 bg-ink-950/85 px-4 py-3 backdrop-blur-xl sm:-left-6"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE.outExpo, delay: 0.95 }}
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-electric-500/15 text-electric-300">
                <ShieldCheck className="size-4.5" aria-hidden />
              </span>
              <div>
                <p className="font-display text-[13.5px] font-semibold tracking-[-0.01em] text-white">
                  Site surveyed first
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                  Every camera, placed on purpose
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* --- Scroll cue -------------------------------------------------- */}
      <motion.div
        className="shell hidden pb-8 lg:block"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        aria-hidden
      >
        <div className="flex items-center gap-3">
          <span className="relative flex h-9 w-5 justify-center rounded-full border border-white/25">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/70 animate-scroll-hint" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">
            Scroll
          </span>
        </div>
      </motion.div>
    </section>
  );
}
