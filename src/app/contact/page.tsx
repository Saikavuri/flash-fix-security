import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { pageHeroImages } from "@/config/page-heroes";
import { Reveal } from "@/components/motion/Reveal";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { business, telLink, whatsappLink } from "@/config/business";

export const metadata: Metadata = {
  title: "Contact Us — CCTV Installation in Hyderabad",
  description:
    "Contact our CCTV team in Hyderabad for installation, supply, repair or AMC quotes. Call, WhatsApp or send an enquiry — we will come back to you.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about"
        titleMuted="your property."
        description="Call, message on WhatsApp, or send an enquiry. Whichever is easiest — we will come back with a clear quotation."
        image={pageHeroImages.contact.src}
        imageFocus={pageHeroImages.contact.focus}
      />

      {/* --- Contact details + form ---------------------------------------- */}
      <section className="bg-white">
        <div className="shell py-section">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            {/* Details */}
            <div className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow">Reach us</p>
                <h2 className="mt-5 font-display text-display-sm font-semibold text-ink-950">
                  Direct lines, no call centre.
                </h2>

                <ul className="mt-9 space-y-7">
                  <li className="flex gap-4">
                    <span
                      className="flex size-10 shrink-0 items-center justify-center rounded-full border border-ink-950/10 text-electric-600"
                      aria-hidden
                    >
                      <Phone className="size-4" />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
                        Call
                      </p>
                      <a
                        href={telLink()}
                        className="mt-1.5 block font-display text-lg font-semibold tracking-[-0.006em] text-ink-950 transition-colors duration-300 hover:text-electric-600"
                      >
                        {business.phoneDisplay}
                      </a>
                    </div>
                  </li>

                  <li className="flex gap-4">
                    <span
                      className="flex size-10 shrink-0 items-center justify-center rounded-full border border-ink-950/10 text-signal-500"
                      aria-hidden
                    >
                      <MessageCircle className="size-4" />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
                        WhatsApp
                      </p>
                      <a
                        href={whatsappLink(
                          "Hi, I'd like to discuss a CCTV project in Hyderabad."
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1.5 block font-display text-lg font-semibold tracking-[-0.006em] text-ink-950 transition-colors duration-300 hover:text-signal-600"
                      >
                        Message us
                      </a>
                      <p className="mt-1 text-[13.5px] text-ink-500">
                        Fastest response during working hours.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-4">
                    <span
                      className="flex size-10 shrink-0 items-center justify-center rounded-full border border-ink-950/10 text-electric-600"
                      aria-hidden
                    >
                      <Mail className="size-4" />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
                        Email
                      </p>
                      <a
                        href={`mailto:${business.email}`}
                        className="mt-1.5 block break-all font-display text-lg font-semibold tracking-[-0.006em] text-ink-950 transition-colors duration-300 hover:text-electric-600"
                      >
                        {business.email}
                      </a>
                    </div>
                  </li>

                  <li className="flex gap-4">
                    <span
                      className="flex size-10 shrink-0 items-center justify-center rounded-full border border-ink-950/10 text-electric-600"
                      aria-hidden
                    >
                      <MapPin className="size-4" />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
                        Visit
                      </p>
                      <address className="mt-1.5 text-[15px] not-italic leading-relaxed text-ink-700">
                        {business.address.line1}
                        <br />
                        {business.address.line2}
                        <br />
                        {business.address.city}, {business.address.state}{" "}
                        {business.address.pincode}
                      </address>
                      <a
                        href={business.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-[13.5px] font-medium text-electric-600 underline underline-offset-4"
                      >
                        Get directions
                      </a>
                    </div>
                  </li>

                  <li className="flex gap-4">
                    <span
                      className="flex size-10 shrink-0 items-center justify-center rounded-full border border-ink-950/10 text-electric-600"
                      aria-hidden
                    >
                      <Clock className="size-4" />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
                        Business hours
                      </p>
                      <ul className="mt-1.5 space-y-1 text-[15px] text-ink-700">
                        {business.hours.map((h) => (
                          <li key={h.days}>
                            <span className="text-ink-500">{h.days}:</span> {h.time}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                </ul>
              </Reveal>
            </div>

            {/* Form */}
            <div id="quote" className="scroll-mt-24 lg:col-span-8">
              <Reveal delay={0.08}>
                <div className="mb-8">
                  <p className="eyebrow">Free quotation</p>
                  <h2 className="mt-4 font-display text-display-sm font-semibold text-ink-950">
                    Request your quote
                  </h2>
                  <p className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-ink-600">
                    Fill in the details and we&apos;ll call you back to confirm the site
                    visit and requirements.
                  </p>
                </div>
                <EnquiryForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* --- Service areas --------------------------------------------------- */}
      <section className="border-t border-ink-950/8 bg-bone-100">
        <div className="shell py-16">
          <Reveal>
            <p className="eyebrow">Where we work</p>
            <h2 className="mt-4 font-display text-display-sm font-semibold text-ink-950">
              Hyderabad service areas
            </h2>
            <p className="mt-3 max-w-xl text-[15.5px] text-ink-600">
              We cover {business.city} and the surrounding region. If your area is not
              listed, message us — we will confirm coverage.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {business.serviceAreas.map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-ink-950/12 bg-white px-4 py-2 text-[13.5px] text-ink-700"
                >
                  {area}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
