"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useReveal } from "@/components/motion/useReveal";
import { useRef } from "react";
import { processSteps } from "@/data/site";

export function ProcessTimeline() {
  const reduce = useReducedMotion();
  const reveal = useReveal();
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 78%", "end 55%"],
  });

  // Desktop: horizontal progress line grows with scroll.
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineScaleMobile = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="bg-white">
      <div className="shell py-section">
        {/* --- Header --------------------------------------------------- */}
        <div className="max-w-3xl">
          <motion.div
            className="flex items-center gap-3"
                        {...reveal({ opacity: 0, y: 14 }, { opacity: 1, y: 0 }, { delay: 0, duration: 0.6 })}>
            <span className="h-px w-10 bg-electric-500" aria-hidden />
            <span className="eyebrow">How it works</span>
          </motion.div>

          <motion.h2
            className="mt-6 font-display text-display-lg font-semibold text-ink-950"
            {...reveal({ opacity: 0, y: 24 }, { opacity: 1, y: 0 }, { delay: 0.06, duration: 0.7 })}>
            From first message to
            <br className="hidden sm:block" />{" "}
            <span className="text-ink-400">a system you can trust.</span>
          </motion.h2>
        </div>

        {/* --- Timeline -------------------------------------------------- */}
        <div ref={trackRef} className="relative mt-14 lg:mt-20">
          {/* Progress rail — vertical on mobile, horizontal on desktop */}
          <div
            className="absolute left-[19px] top-2 h-full w-px bg-ink-950/10 lg:left-0 lg:top-[19px] lg:h-px lg:w-full"
            aria-hidden
          />
          <motion.div
            className="absolute left-[19px] top-2 h-full w-px origin-top bg-electric-500 lg:left-0 lg:top-[19px] lg:h-px lg:w-full lg:origin-left"
            style={
              reduce
                ? { scaleY: 1, scaleX: 1 }
                : { scaleY: lineScaleMobile, scaleX: lineScale }
            }
            aria-hidden
          />

          <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
            {processSteps.map((step) => (
              <motion.li
                key={step.index}
                className="relative flex gap-5 pl-0 lg:block lg:pr-4"
            {...reveal({ opacity: 0, y: 26 }, { opacity: 1, y: 0 }, { delay: 0, duration: 0.65 })}>
                {/* Node */}
                <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-ink-950/10 bg-white">
                  <span className="font-mono text-[11px] tracking-[0.1em] text-ink-950">
                    {step.index}
                  </span>
                  <span
                    className="absolute inset-0 rounded-full border border-electric-500/40"
                    aria-hidden
                  />
                </div>

                {/* Copy */}
                <div className="lg:mt-7 lg:pr-6">
                  <h3 className="font-display text-xl font-semibold tracking-[-0.006em] text-ink-950">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                    {step.copy}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
