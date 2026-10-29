import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { QuoteSection } from "@/components/home/QuoteSection";
import { ClosingCta } from "@/components/home/ClosingCta";
import { products } from "@/data/site";
import { whatsappLink } from "@/config/business";

export const metadata: Metadata = {
  title: "CCTV Products — Cameras, DVR & NVR Systems in Hyderabad",
  description:
    "Dome, bullet, IP, wireless and PTZ cameras plus DVR and NVR recorders and accessories. Enquire for pricing on every product.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Cameras and recorders"
        titleMuted="that earn their place."
        description="We supply a focused range of CCTV equipment and help you pick what the site actually needs — no padding, no guesswork."
        image="/images/pages/products.jpg"
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="#quote" className="btn btn-electric group">
            Enquire for Price
            <ArrowRight
              className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
              aria-hidden
            />
          </a>
          <a
            href={whatsappLink("Hi, I'd like a price for CCTV equipment.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost-dark"
          >
            <MessageCircle className="size-4" aria-hidden />
            Chat on WhatsApp
          </a>
        </div>
      </PageHero>

      {/* Product grid (shared with home) */}
      <ProductShowcase />

      {/* Quick links by product */}
      <section className="border-t border-ink-950/8 bg-white">
        <div className="shell py-16">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Jump to a category</p>
              <h2 className="mt-4 font-display text-display-sm font-semibold text-ink-950">
                Find the right equipment
              </h2>
            </div>
            <Link href="/solutions" className="btn btn-outline">
              Not sure? See solutions
            </Link>
          </div>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border border-ink-950/8 bg-ink-950/8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <li key={product.id}>
                <Link
                  href="/products"
                  className="group flex h-full flex-col bg-white p-6 transition-colors duration-300 hover:bg-bone-50"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
                    {product.tagline}
                  </span>
                  <span className="mt-2.5 font-display text-lg font-semibold tracking-[-0.006em] text-ink-950">
                    {product.name}
                  </span>
                  <span className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-600">
                    {product.description}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-ink-950">
                    Enquire
                    <ArrowRight
                      className="size-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-[13.5px] text-ink-500">
            Model specifications, pricing and stock availability are confirmed on
            enquiry — they vary by model and quantity.
          </p>
        </div>
      </section>

      <QuoteSection />
      <ClosingCta />
    </>
  );
}
