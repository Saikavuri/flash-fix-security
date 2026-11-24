"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { cctvCameras } from "@/data/site";
import { business, whatsappLink } from "@/config/business";
import { useReveal } from "@/components/motion/useReveal";
import { cn } from "@/lib/utils";

/**
 * Homepage CCTV camera strip — representative body styles; full lineup on /products.
 */
const FEATURED = [
  "dome-camera",
  "bullet-camera",
  "ip-camera",
  "wireless-camera",
  "solar-camera",
];

export function ProductsCondensed() {
  const reveal = useReveal();
  const featured = cctvCameras.filter((p) => FEATURED.includes(p.id));

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
              <span className="eyebrow">CCTV cameras</span>
            </motion.div>

            <motion.h2
              className="mt-6 font-display text-display-lg font-semibold text-ink-950"
              {...reveal({ opacity: 0, y: 24 }, { opacity: 1, y: 0 }, { delay: 0.06, duration: 0.7 })}
            >
              Cameras matched to the site,
              <br className="hidden sm:block" />{" "}
              <span className="text-ink-400">not generic kits.</span>
            </motion.h2>
          </div>

          <motion.p
            className="lede lg:col-span-5 lg:pb-2"
            {...reveal({ opacity: 0, y: 20 }, { opacity: 1, y: 0 }, { delay: 0.14, duration: 0.7 })}
          >
            We supply dome, bullet, IP, wireless, solar and PTZ CCTV cameras — spec
            and pricing confirmed when we quote for your property.
          </motion.p>
        </div>

        {/* --- Grid ----------------------------------------------------- */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-6 lg:gap-5">
          {featured.map((product, i) => {
            const focus = product.imageFocus ?? "50% 50%";
            const cardIndex = String(i + 1).padStart(2, "0");
            const Icon = product.icon;

            return (
              <motion.article
                key={product.id}
                {...reveal(
                  { opacity: 0, y: 24 },
                  { opacity: 1, y: 0 },
                  { delay: (i % 5) * 0.07, duration: 0.7 }
                )}
                className={cn(
                  "group flex h-full flex-col overflow-hidden rounded-xl border border-ink-950/8 bg-white shadow-[0_1px_0_rgba(7,9,14,0.04)] transition-all duration-500 hover:border-electric-500/20 hover:shadow-lift-lg sm:col-span-1 lg:col-span-2",
                  i === 3 && "lg:col-start-2",
                  i === 4 && "lg:col-start-4"
                )}
              >
                <Link
                  href="/products"
                  className="relative block shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-electric-500 focus-visible:ring-offset-2"
                >
                  <div className="media aspect-[4/3] w-full rounded-none bg-ink-900">
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      quality={84}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="size-full object-cover transition-transform duration-[1000ms] ease-out-expo group-hover:scale-[1.06]"
                      style={{ objectPosition: focus }}
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/35 via-transparent to-transparent"
                      aria-hidden
                    />
                  </div>

                  <div
                    className="pointer-events-none absolute left-0 top-0 flex max-w-[85%] items-center gap-2 rounded-br-xl border border-white/10 border-l-0 border-t-0 bg-ink-950/80 px-3 py-2 backdrop-blur-md"
                    aria-hidden
                  >
                    <span className="font-mono text-[10px] tracking-[0.2em] text-electric-300/90">
                      {cardIndex}
                    </span>
                    <span className="h-3 w-px bg-white/20" aria-hidden />
                    <Icon className="size-3.5 shrink-0 text-electric-400" aria-hidden />
                    <span className="truncate font-mono text-[9px] uppercase tracking-[0.14em] text-white/70">
                      {product.tagline}
                    </span>
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  <Link
                    href="/products"
                    className="font-display text-lg font-semibold tracking-[-0.02em] text-ink-950 transition-colors duration-300 hover:text-electric-600"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-ink-600 line-clamp-4">
                    {product.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ink-950/8 pt-4">
                    <a
                      href="#quote"
                      className="link-underline text-[13.5px] font-semibold text-ink-950"
                    >
                      Enquire for price
                      <ArrowRight className="size-3.5" aria-hidden />
                    </a>
                    <a
                      href={whatsappLink(
                        `Hi, I'd like a price for ${product.name}.`,
                        business.name
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink-950/10 bg-bone-50 px-3 py-1.5 text-[13px] font-medium text-ink-600 transition-colors duration-300 hover:border-signal-500/30 hover:text-ink-950"
                    >
                      <MessageCircle className="size-3.5 text-signal-500" aria-hidden />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* --- Link to full catalogue ------------------------------------- */}
        <motion.div
          className="mt-12 flex flex-col items-center justify-between gap-5 rounded-xl border border-ink-950/8 bg-white px-7 py-6 sm:flex-row"
          {...reveal({ opacity: 0, y: 18 }, { opacity: 1, y: 0 }, { duration: 0.6 })}
        >
          <div>
            <p className="font-display text-lg font-semibold tracking-[-0.02em] text-ink-950">
              PTZ cameras and site-specific recommendations
            </p>
            <p className="mt-1 text-[14.5px] text-ink-600">
              See every camera type we carry — we&apos;ll shortlist models after a site
              visit.
            </p>
          </div>
          <a href="/products" className="btn btn-outline group shrink-0">
            All CCTV cameras
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