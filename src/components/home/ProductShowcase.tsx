"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useReveal } from "@/components/motion/useReveal";
import { ArrowRight, MessageCircle } from "lucide-react";
import {
  products,
  productCategories,
  type ProductCategory,
} from "@/data/site";
import { business, whatsappLink } from "@/config/business";
import { cn } from "@/lib/utils";

type Filter = ProductCategory | "all";

export function ProductShowcase() {
  const [filter, setFilter] = useState<Filter>("all");
  const reduce = useReducedMotion();
  const reveal = useReveal();

  const visible = useMemo(
    () =>
      filter === "all"
        ? products
        : products.filter((p) => p.category === filter),
    [filter]
  );

  return (
    <section id="products" className="relative bg-bone-100">
      <div className="shell py-section">
        {/* --- Header ---------------------------------------------------- */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <motion.div
              className="flex items-center gap-3"
                          {...reveal({ opacity: 0, y: 14 }, { opacity: 1, y: 0 }, { delay: 0, duration: 0.6 })}>
              <span className="h-px w-10 bg-electric-500" aria-hidden />
              <span className="eyebrow">Product range</span>
            </motion.div>

            <motion.h2
              className="mt-6 font-display text-display-lg font-semibold text-ink-950"
            {...reveal({ opacity: 0, y: 24 }, { opacity: 1, y: 0 }, { delay: 0.06, duration: 0.7 })}>
              Equipment chosen for the site,
              <br className="hidden sm:block" />{" "}
              <span className="text-ink-400">not for the shelf.</span>
            </motion.h2>
          </div>

          <motion.p
            className="lede lg:col-span-5 lg:pb-2"
            {...reveal({ opacity: 0, y: 20 }, { opacity: 1, y: 0 }, { delay: 0.14, duration: 0.7 })}>
            We supply cameras, recorders and the accessories that make a system
            reliable. Specifications, pricing and availability are confirmed when we
            quote — no guesswork.
          </motion.p>
        </div>

        {/* --- Filters ---------------------------------------------------- */}
        <motion.div
          className="no-scrollbar mt-12 -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
          role="group"
          aria-label="Filter products by category"
            {...reveal({ opacity: 0, y: 16 }, { opacity: 1, y: 0 }, { delay: 0.1, duration: 0.6 })}>
          {productCategories.map((cat) => {
            const active = filter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilter(cat.id)}
                aria-pressed={active}
                className={cn(
                  "relative shrink-0 rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors duration-300",
                  active
                    ? "border-ink-950 bg-ink-950 text-white"
                    : "border-ink-950/12 bg-white/60 text-ink-600 hover:border-ink-950/30 hover:text-ink-950"
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* --- Grid ------------------------------------------------------- */}
        <motion.div
          className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
          layout
        >
          <AnimatePresence mode="popLayout">
            {visible.map((product) => (
              <motion.article
                key={product.id}
                layout
                initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, y: -12, scale: 0.98 }}
                
                className="group flex flex-col"
              >
                <div className="media aspect-[4/3] w-full rounded-lg bg-white">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    quality={82}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="size-full object-cover transition-transform duration-[1000ms] ease-out-expo group-hover:scale-[1.07]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden
                  />
                </div>

                <div className="flex flex-1 flex-col pt-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
                    {product.tagline}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold tracking-[-0.006em] text-ink-950">
                    {product.name}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-600">
                    {product.description}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <a
                      href={`#${product.id}`}
                      className="link-underline text-[14px] font-semibold text-ink-950"
                    >
                      Enquire for Price
                      <ArrowRight className="size-3.5" aria-hidden />
                    </a>
                    <a
                      href={whatsappLink(
                        `Hi, I'd like a price for ${product.name}.`,
                        business.name
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink-500 transition-colors duration-300 hover:text-ink-950"
                    >
                      <MessageCircle className="size-3.5 text-signal-500" aria-hidden />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="mt-12 text-[13.5px] text-ink-500">
          Product specifications, pricing and availability are confirmed on enquiry —
          they vary by model and quantity.
        </p>
      </div>
    </section>
  );
}
