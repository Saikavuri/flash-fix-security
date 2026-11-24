"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import {
  solutions,
  solutionSegments,
  type Solution,
  type SolutionSegment,
} from "@/data/site";
import { business, whatsappLink } from "@/config/business";
import { contactQuoteHref } from "@/config/navigation";
import { useReveal } from "@/components/motion/useReveal";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

type Filter = SolutionSegment | "all";

export function SolutionsExplorer() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState(solutions[0]?.id ?? "");
  const reduce = useReducedMotion();
  const reveal = useReveal();

  const filtered = useMemo(
    () =>
      filter === "all"
        ? solutions
        : solutions.filter((s) => s.segment === filter),
    [filter]
  );

  const selected = useMemo(
    () => filtered.find((s) => s.id === selectedId) ?? filtered[0],
    [filtered, selectedId]
  );

  useEffect(() => {
    if (!filtered.some((s) => s.id === selectedId)) {
      setSelectedId(filtered[0]?.id ?? "");
    }
  }, [filtered, selectedId]);

  return (
    <section id="solutions" className="bg-bone-100">
      <div className="shell py-section">
        {/* --- Intro --------------------------------------------------- */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <motion.div
              className="flex items-center gap-3"
              {...reveal({ opacity: 0, y: 14 }, { opacity: 1, y: 0 }, { duration: 0.6 })}
            >
              <span className="h-px w-10 bg-electric-500" aria-hidden />
              <span className="eyebrow">Find your setup</span>
            </motion.div>

            <motion.h2
              className="mt-6 font-display text-display-lg font-semibold text-ink-950"
              {...reveal({ opacity: 0, y: 24 }, { opacity: 1, y: 0 }, { delay: 0.06, duration: 0.7 })}
            >
              Pick a property type.
              <br className="hidden sm:block" />{" "}
              <span className="text-ink-400">See what we typically deploy.</span>
            </motion.h2>
          </div>

          <motion.p
            className="lede lg:col-span-5 lg:pb-2"
            {...reveal({ opacity: 0, y: 20 }, { opacity: 1, y: 0 }, { delay: 0.14, duration: 0.7 })}
          >
            Select a category, then a property type on the left. Coverage points and next
            steps update instantly on the right.
          </motion.p>
        </div>

        {/* --- Filters ------------------------------------------------- */}
        <motion.div
          className="no-scrollbar mt-10 -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
          role="group"
          aria-label="Filter solutions by property category"
          {...reveal({ opacity: 0, y: 16 }, { opacity: 1, y: 0 }, { delay: 0.08, duration: 0.6 })}
        >
          {solutionSegments.map((seg) => {
            const active = filter === seg.id;
            return (
              <button
                key={seg.id}
                type="button"
                onClick={() => setFilter(seg.id)}
                aria-pressed={active}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2.5 text-[13.5px] font-medium transition-all duration-300",
                  active
                    ? "border-ink-950 bg-ink-950 text-white shadow-lift"
                    : "border-ink-950/12 bg-white text-ink-600 hover:border-electric-500/35 hover:text-ink-950"
                )}
              >
                {seg.label}
              </button>
            );
          })}
        </motion.div>

        {/* --- Explorer ------------------------------------------------ */}
        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          <ul
            className="flex flex-col gap-2 lg:col-span-5"
            role="listbox"
            aria-label="Property types"
          >
            {filtered.map((solution, i) => (
              <SolutionListItem
                key={solution.id}
                solution={solution}
                index={i}
                active={selected?.id === solution.id}
                onSelect={() => setSelectedId(solution.id)}
              />
            ))}
          </ul>

          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-28">
              <AnimatePresence mode="wait">
                {selected && (
                  <SolutionDetail
                    key={selected.id}
                    solution={selected}
                    reduce={!!reduce}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SolutionListItem({
  solution,
  index,
  active,
  onSelect,
}: {
  solution: Solution;
  index: number;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <li role="presentation">
      <button
        type="button"
        role="option"
        aria-selected={active}
        onClick={onSelect}
        className={cn(
          "group flex w-full items-center gap-4 rounded-xl border p-3 text-left transition-all duration-300 sm:p-4",
          active
            ? "border-electric-500/40 bg-white shadow-lift-lg ring-1 ring-electric-500/20"
            : "border-ink-950/8 bg-white/70 hover:border-ink-950/15 hover:bg-white hover:shadow-md"
        )}
      >
        <span className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-ink-900 sm:size-[72px]">
          <Image
            src={solution.image}
            alt=""
            fill
            sizes="72px"
            quality={82}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition: solution.imageFocus ?? "50% 50%" }}
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">
            {String(index + 1).padStart(2, "0")} · {solution.segment}
          </span>
          <span className="mt-1 block font-display text-lg font-semibold tracking-[-0.02em] text-ink-950">
            {solution.title}
          </span>
        </span>
        <ArrowRight
          className={cn(
            "size-4 shrink-0 transition-transform duration-300",
            active
              ? "translate-x-0.5 text-electric-600"
              : "text-ink-300 group-hover:translate-x-0.5 group-hover:text-ink-500"
          )}
          aria-hidden
        />
      </button>
    </li>
  );
}

function SolutionDetail({
  solution,
  reduce,
}: {
  solution: Solution;
  reduce: boolean;
}) {
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: EASE.outExpo }}
      className="overflow-hidden rounded-2xl border border-ink-950/8 bg-white shadow-[0_24px_80px_-32px_rgba(7,9,14,0.18)]"
    >
      <div className="media relative aspect-[16/10] w-full rounded-none">
        <Image
          src={solution.image}
          alt={solution.imageAlt}
          fill
          priority
          quality={84}
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="size-full object-cover"
          style={{ objectPosition: solution.imageFocus ?? "50% 45%" }}
        />
        <div className="scrim-bottom absolute inset-0" aria-hidden />
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.5 }}
          className="absolute bottom-5 left-5 right-5 font-display text-2xl font-semibold tracking-[-0.02em] text-white sm:text-[1.65rem]"
        >
          {solution.title}
        </motion.p>
      </div>

      <div className="p-6 sm:p-8">
        <p className="text-[16px] leading-relaxed text-ink-600">{solution.description}</p>

        <ul className="mt-7 space-y-3" aria-label={`${solution.title} coverage points`}>
          {solution.points.map((point, i) => (
            <motion.li
              key={point}
              initial={reduce ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 + i * 0.06, duration: 0.45, ease: EASE.outExpo }}
              className="flex items-start gap-3 text-[15px] text-ink-700"
            >
              <CheckCircle2
                className="mt-0.5 size-4 shrink-0 text-electric-500"
                aria-hidden
              />
              {point}
            </motion.li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3 border-t border-ink-950/8 pt-6">
          <Link href={contactQuoteHref} className="btn btn-electric group">
            Quote for {solution.title.toLowerCase()}
            <ArrowRight
              className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
          <a
            href={whatsappLink(
              `Hi, I'd like a CCTV solution for ${solution.title.toLowerCase()} in Hyderabad.`,
              business.name
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <MessageCircle className="size-4 text-signal-500" aria-hidden />
            WhatsApp
          </a>
        </div>
      </div>
    </motion.article>
  );
}