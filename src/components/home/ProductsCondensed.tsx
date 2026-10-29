"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { products } from "@/data/site";
import { business, whatsappLink } from "@/config/business";
import { useReveal } from "@/components/motion/useReveal";

/**
 * Condensed product strip for the homepage.
 *
 * Four representative products; the full range with category filtering lives
 * on /products.
 */
const FEATURED = ["dome-camera", "bullet-camera", "ip-camera", "nvr"];

export function ProductsCondensed() {
  const reveal = useReveal();
  const featured = products.filter((p) => FEATURED.includes(p.id));

  return (
    <section id="products" className="bg-bone-100">
      <div className="shell py-section">
        {/* --- Header --------------------------------------------------- */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <motion.div
              className="flex items-center gap-3"
              {...reveal({ opacity: 0, y: 14 }, { opacity: 1, y: 0 }, { duration: 0.6 })}
            >
              <span className="h-px w-10 bg-electric-500" aria-hidden />
              <span className="eyebrow">Product range</span>
            </motion.div>

            <motion.h2
              className="mt-6 font-display text-display-lg font-semibold text-ink-950"
              {...reveal({ opacity: 0, y: 24 }, { opacity: 1, y: 0 }, { delay: 0.06, duration: 0.7 })}
            >
              Equipment chosen for the site,
              <br className="hidden sm:block" />{" "}
              <span className="text-ink-400">not for the shelf.</span>
            </motion.h2>
          </div>

          <motion.p
            className="lede lg:col-span-5 lg:pb-2"
            {...reveal({ opacity: 0, y: 20 }, { opacity: 1, y: 0 }, { delay: 0.14, duration: 0.7 })}
          >
            Cameras, recorders and the accessories that make a system reliable.
            Specifications and pricing are confirmed when we quote.
          </motion.p>
        </div>

        {/* --- Grid ----------------------------------------------------- */}
        <div className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {featured.map((product, i) => (
            <motion.article
              key={product.id}
              {...reveal(
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0 },
                { delay: (i % 4) * 0.07, duration: 0.7 }
              )}
              className="group flex flex-col"
            >
              <div className="media aspect-[4/3] w-full rounded-lg bg-white">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  quality={82}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="size-full object-cover transition-transform duration-[1000ms] ease-out-expo group-hover:scale-[1.07]"
                />
              </div>

              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
                {product.tagline}
              </p>
              <h3 className="mt-2.5 font-display text-lg font-semibold tracking-[-0.02em] text-ink-950">
                {product.name}
              </h3>
              <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-ink-600">
                {product.description}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                <a
                  href="/products"
                  className="link-underline text-[13.5px] font-semibold text-ink-950"
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
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-500 transition-colors duration-300 hover:text-ink-950"
                >
                  <MessageCircle className="size-3.5 text-signal-500" aria-hidden />
                  WhatsApp
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* --- Link to full catalogue ------------------------------------- */}
        <motion.div
          className="mt-12 flex flex-col items-center justify-between gap-5 rounded-lg border border-ink-950/8 bg-white px-7 py-6 sm:flex-row"
          {...reveal({ opacity: 0, y: 18 }, { opacity: 1, y: 0 }, { duration: 0.6 })}
        >
          <div>
            <p className="font-display text-lg font-semibold tracking-[-0.02em] text-ink-950">
              Wireless, PTZ, DVR and accessories
            </p>
            <p className="mt-1 text-[14.5px] text-ink-600">
              The full range, filterable by type — plus storage and mounting.
            </p>
          </div>
          <a href="/products" className="btn btn-outline group shrink-0">
            All products
            <ArrowRight
              className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
              aria-hidden
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
