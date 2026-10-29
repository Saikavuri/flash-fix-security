"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useReveal } from "@/components/motion/useReveal";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { projects } from "@/data/site";
import { cn } from "@/lib/utils";

export function ProjectGallery() {
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const reveal = useReveal();

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((i) => (i === null ? null : (i + 1) % projects.length)),
    []
  );
  const prev = useCallback(
    () =>
      setActive((i) =>
        i === null ? null : (i - 1 + projects.length) % projects.length
      ),
    []
  );

  /* --- Keyboard controls ------------------------------------------------ */
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close, next, prev]);

  const current = active === null ? null : projects[active];

  return (
    <section id="projects" className="bg-bone-100">
      <div className="shell py-section">
        {/* --- Header ---------------------------------------------------- */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <motion.div
              className="flex items-center gap-3"
                          {...reveal({ opacity: 0, y: 14 }, { opacity: 1, y: 0 }, { delay: 0, duration: 0.6 })}>
              <span className="h-px w-10 bg-electric-500" aria-hidden />
              <span className="eyebrow">Recent work</span>
            </motion.div>

            <motion.h2
              className="mt-6 font-display text-display-lg font-semibold text-ink-950"
            {...reveal({ opacity: 0, y: 24 }, { opacity: 1, y: 0 }, { delay: 0.06, duration: 0.7 })}>
              Installed on site,
              <br className="hidden sm:block" />{" "}
              <span className="text-ink-400">across Hyderabad.</span>
            </motion.h2>
          </div>

          <motion.p
            className="lede lg:col-span-5 lg:pb-2"
            {...reveal({ opacity: 0, y: 20 }, { opacity: 1, y: 0 }, { delay: 0.14, duration: 0.7 })}>
            A selection of completed installations. Tap any image to view it
            larger.
          </motion.p>
        </div>

        {/* --- Gallery ---------------------------------------------------- */}
        <div className="mt-12 grid grid-cols-2 gap-3 lg:mt-16 lg:grid-cols-4 lg:gap-4">
          {projects.map((project, i) => (
            <motion.button
              key={project.id}
              type="button"
              onClick={() => setActive(i)}
              {...reveal({ opacity: 0, y: 26 }, { opacity: 1, y: 0 }, { delay: (i % 4) * 0.06 , duration: 0.65 })}
              className={cn(
                "group relative block w-full overflow-hidden rounded-lg bg-ink-900 text-left",
                project.featured && "col-span-2 row-span-2"
              )}
              aria-label={`View project: ${project.title}`}
            >
              <div
                className={cn(
                  "media w-full",
                  project.featured
                    ? "aspect-square"
                    : "aspect-[4/3]"
                )}
              >
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  quality={80}
                  sizes={
                    project.featured
                      ? "(max-width: 1024px) 100vw, 50vw"
                      : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  }
                  className="size-full object-cover transition-transform duration-[1100ms] ease-out-expo group-hover:scale-[1.07]"
                />
              </div>

              <div
                className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95"
                aria-hidden
              />

              {/* Caption */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
                  {project.category}
                </p>
                <p className="mt-1.5 font-display text-[15px] font-semibold leading-snug text-white sm:text-base">
                  {project.title}
                </p>
              </div>

              <span
                className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-md transition-opacity duration-400 group-hover:opacity-100"
                aria-hidden
              >
                <Expand className="size-4" />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* --- Lightbox ------------------------------------------------------ */}
      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/94 p-4 backdrop-blur-md sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/[0.14] sm:right-6 sm:top-6"
              aria-label="Close gallery"
            >
              <X className="size-5" aria-hidden />
            </button>

            {projects.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className="absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/[0.14] sm:left-6"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="size-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  className="absolute right-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/[0.14] sm:right-6"
                  aria-label="Next project"
                >
                  <ChevronRight className="size-5" aria-hidden />
                </button>
              </>
            )}

            <motion.figure
              key={current.id}
              className="relative max-h-full w-full max-w-5xl"
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
              
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-ink-900">
                <Image
                  src={current.image}
                  alt={current.imageAlt}
                  fill
                  quality={88}
                  sizes="100vw"
                  className="size-full object-cover"
                />
              </div>
              <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-2 text-white">
                <span className="font-display text-lg font-semibold tracking-[-0.006em]">
                  {current.title}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                  {current.category}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
