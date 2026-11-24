import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { pageHeroImages } from "@/config/page-heroes";
import { Reveal } from "@/components/motion/Reveal";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { TrustSection } from "@/components/home/TrustSection";
import { ClosingCta } from "@/components/home/ClosingCta";
import { contactQuoteHref } from "@/config/navigation";
import { business, whatsappLink } from "@/config/business";

export const metadata: Metadata = {
  title: "About Us — CCTV Specialists Serving Hyderabad",
  description:
    "We install, supply, repair and maintain CCTV systems across Hyderabad. Learn how we work, what we cover, and how to get a quote.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A security company"
        titleMuted="that stays after the invoice."
        description="We install, supply, repair and maintain CCTV systems across Hyderabad — and we keep supporting the systems we build."
        image={pageHeroImages.about.src}
        imageFocus={pageHeroImages.about.focus}
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
            href={whatsappLink("Hi, I'd like to know more about your CCTV services.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost-dark"
          >
            <MessageCircle className="size-4" aria-hidden />
            Chat on WhatsApp
          </a>
        </div>
      </PageHero>

      {/* --- Story ------------------------------------------------------- */}
      <section className="bg-white">
        <div className="shell py-section">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal>
                <p className="eyebrow">What we do</p>
                <h2 className="mt-5 font-display text-display-md font-semibold text-ink-950">
                  Security systems that work on an ordinary day.
                </h2>
                <div className="mt-6 space-y-5 text-[16.5px] leading-relaxed text-ink-600">
                  <p>
                    Most CCTV failures are not dramatic. A lens fogs, a camera is
                    knocked slightly out of alignment, a drive fills up, a connector
                    corrodes in the monsoon — and by the time anyone notices, the
                    recording you needed is missing.
                  </p>
                  <p>
                    We build systems around that reality. That means surveying the
                    site before quoting, using equipment we can actually get parts
                    for, and offering maintenance on a schedule so problems surface
                    early.
                  </p>
                  <p>
                    We work across residential, retail, commercial and industrial
                    properties in {business.city} — and we service installations
                    done by other vendors too.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="lg:col-span-6">
              <div className="media aspect-[4/3] w-full rounded-lg lg:aspect-[5/4]">
                <Image
                  src="/images/trust/maintenance.jpg"
                  alt="CCTV technician working on a security camera installation"
                  fill
                  quality={84}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="size-full object-cover"
                />
              </div>

              <dl className="mt-8 grid gap-px overflow-hidden rounded-lg border border-ink-950/8 bg-ink-950/8 sm:grid-cols-3">
                {[
                  { label: "Coverage", value: `${business.city} & region` },
                  { label: "Services", value: "Supply · Install · Repair · AMC" },
                  { label: "Support", value: "Same team, start to finish" },
                ].map((item) => (
                  <div key={item.label} className="bg-white p-5">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
                      {item.label}
                    </dt>
                    <dd className="mt-2 font-display text-[15px] font-semibold tracking-[-0.004em] text-ink-950">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- Process ----------------------------------------------------- */}
      <ProcessTimeline />

      {/* --- Trust / maintenance ------------------------------------------ */}
      <TrustSection />

      {/* --- Cross-links --------------------------------------------------- */}
      <section className="border-t border-ink-950/8 bg-bone-100">
        <div className="shell py-16">
          <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-display-sm font-semibold text-ink-950">
                See what we install, and where.
              </h2>
              <p className="mt-2 text-[15.5px] text-ink-600">
                Browse our product range and recent project work.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/products" className="btn btn-outline">
                Products
              </Link>
              <Link href="/projects" className="btn btn-outline">
                Projects
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Contact
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
