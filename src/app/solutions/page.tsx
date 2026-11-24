import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { pageHeroImages } from "@/config/page-heroes";
import { SolutionsExplorer } from "@/components/solutions/SolutionsExplorer";
import { ClosingCta } from "@/components/home/ClosingCta";
import { contactQuoteHref } from "@/config/navigation";
import { whatsappLink } from "@/config/business";

export const metadata: Metadata = {
  title: "CCTV Solutions by Property Type — Hyderabad",
  description:
    "Security camera solutions for homes, apartments, shops, offices, warehouses, factories, commercial buildings and gated communities across Hyderabad.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Coverage designed for"
        titleMuted="how the space is used."
        description="Homes, shops, offices and industrial sites all fail in different ways. Here is what we typically deploy for each — and why."
        image={pageHeroImages.solutions.src}
        imageFocus={pageHeroImages.solutions.focus}
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <a href={contactQuoteHref} className="btn btn-electric group">
            Get a Free Quote
            <ArrowRight
              className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
              aria-hidden
            />
          </a>
          <a
            href={whatsappLink(
              "Hi, I'd like a CCTV solution for my property in Hyderabad."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost-dark"
          >
            <MessageCircle className="size-4" aria-hidden />
            Chat on WhatsApp
          </a>
        </div>
      </PageHero>

      <SolutionsExplorer />

      {/* --- Guidance ------------------------------------------------------ */}
      <section className="border-t border-ink-950/8 bg-white">
        <div className="shell py-section">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="eyebrow">How to choose</p>
              <h2 className="mt-5 font-display text-display-md font-semibold text-ink-950">
                Three questions that decide the setup.
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed text-ink-600">
                These are the same questions we ask on a site visit — and the reason
                two homes on the same street rarely end up with the same system.
              </p>
            </div>

            <div className="lg:col-span-7">
              <ol className="space-y-8">
                {[
                  {
                    q: "What actually needs to be seen?",
                    a: "Start from the risk — entry points, cash handling, stock movement, staff areas — not from a camera count.",
                  },
                  {
                    q: "How long must the footage be kept?",
                    a: "Retention is a storage decision as much as a camera decision, and it changes the recorder and drive you need.",
                  },
                  {
                    q: "Who needs to view it, and when?",
                    a: "Live monitoring on a phone, an owner on-site, or a security desk on shift all lead to different setups.",
                  },
                ].map((item, i) => (
                  <li
                    key={item.q}
                    className="flex gap-6 border-t border-ink-950/10 pt-6 first:border-t-0 first:pt-0"
                  >
                    <span className="font-mono text-[11px] tracking-[0.2em] text-electric-600">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold tracking-[-0.006em] text-ink-950">
                        {item.q}
                      </h3>
                      <p className="mt-2.5 max-w-xl text-[15.5px] leading-relaxed text-ink-600">
                        {item.a}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/services" className="btn btn-outline">
                  See our services
                </Link>
                <a
                  href={whatsappLink(
                    "Hi, I need help choosing a CCTV setup for my property."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-[14px] font-medium text-ink-600 transition-colors duration-300 hover:text-ink-950"
                >
                  <MessageCircle className="size-4 text-signal-500" aria-hidden />
                  Ask for advice
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
