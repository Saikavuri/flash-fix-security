"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useReveal } from "@/components/motion/useReveal";
import { ArrowUpRight } from "lucide-react";
import { solutions } from "@/data/site";
import { cn } from "@/lib/utils";

export function SolutionsGrid() {
  const reveal = useReveal();

  return (
    <section id="solutions" className="relative bg-ink-950 text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid opacity-40"
        aria-hidden
      />

      <div className="relative shell py-section">
        {/* --- Header ---------------------------------------------------- */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <motion.div
              className="flex items-center gap-3"
                          {...reveal({ opacity: 0, y: 14 }, { opacity: 1, y: 0 }, { delay: 0, duration: 0.6 })}>
              <span className="h-px w-10 bg-electric-400" aria-hidden />
              <span className="eyebrow-dark">Solutions by property</span>
            </motion.div>

            <motion.h2
              className="mt-6 font-display text-display-lg font-semibold text-white"
            {...reveal({ opacity: 0, y: 24 }, { opacity: 1, y: 0 }, { delay: 0.06, duration: 0.7 })}>
              Every property has a
              <br className="hidden sm:block" />{" "}
              <span className="text-white/40">different blind spot.</span>
            </motion.h2>
          </div>

          <motion.p
            className="text-[17px] leading-relaxed text-white/55 lg:col-span-5 lg:pb-2"
            {...reveal({ opacity: 0, y: 20 }, { opacity: 1, y: 0 }, { delay: 0.14, duration: 0.7 })}>
            Coverage is designed around how a space is actually used — entrances,
            blind corners, valuable stock, and the routes people take.
          </motion.p>
        </div>

        {/* --- Asymmetric grid --------------------------------------------- */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {solutions.map((solution) => {
            const isWide = solution.span === "wide";
            const isTall = solution.span === "tall";

            return (
              <motion.article
                key={solution.id}
                className={cn(
                  "group relative overflow-hidden rounded-lg",
                  isWide && "sm:col-span-2",
                  isTall && "lg:row-span-2"
                )}
            {...reveal({ opacity: 0, y: 30 }, { opacity: 1, y: 0 }, { delay: 0, duration: 0.7 })}>
                <div
                  className={cn(
                    "media w-full bg-ink-900",
                    isTall
                      ? "aspect-[3/4] lg:aspect-auto lg:h-full lg:min-h-[520px]"
                      : isWide
                        ? "aspect-[16/10] sm:aspect-[2/1]"
                        : "aspect-[4/3]"
                  )}
                >
                  <Image
                    src={solution.image}
                    alt={solution.imageAlt}
                    fill
                    quality={82}
                    sizes={
                      isWide
                        ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                        : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    }
                    className="size-full object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.06]"
                  />
                </div>

                {/* Overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-transparent"
                  aria-hidden
                />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl font-semibold tracking-[-0.008em] text-white">
                      {solution.title}
                    </h3>
                    <ArrowUpRight
                      className="mt-1 size-5 shrink-0 text-white/40 transition-all duration-400 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-electric-400"
                      aria-hidden
                    />
                  </div>

                  <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-white/65">
                    {solution.description}
                  </p>

                  {/* Points — revealed on hover on pointer devices */}
                  <ul
                    className="mt-5 space-y-2 overflow-hidden transition-all duration-500 ease-out-expo sm:max-h-0 sm:opacity-0 sm:group-hover:max-h-48 sm:group-hover:opacity-100"
                    aria-label={`${solution.title} coverage`}
                  >
                    {solution.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-2.5 text-[13px] text-white/55"
                      >
                        <span
                          className="size-1 shrink-0 rounded-full bg-electric-400"
                          aria-hidden
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          className="mt-12 flex justify-center lg:mt-16"
                      {...reveal({ opacity: 0, y: 16 }, { opacity: 1, y: 0 }, { delay: 0, duration: 0.6 })}>
          <a href="#quote" className="btn btn-ghost-dark group">
            Discuss your property
            <ArrowUpRight
              className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
