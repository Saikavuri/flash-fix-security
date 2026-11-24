import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { business, telLink, whatsappLink } from "@/config/business";
import { footerNav } from "@/config/navigation";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink-950 text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid opacity-[0.5]"
        aria-hidden
      />

      <div className="relative shell py-16 lg:py-20">
        {/* --- Top ------------------------------------------------------- */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4 lg:pr-10">
            <Link href="/" className="flex items-center gap-3" aria-label={`${business.name} — home`}>
              <Logo withWordmark tagline={business.tagline} tone="light" size={52} />
            </Link>

            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/55">
              CCTV installation, supply, repair and maintenance for Hyderabad — designed
              around the property, and supported after handover.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={whatsappLink("Hi, I'd like to talk about a CCTV project.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-sm"
              >
                WhatsApp Us
              </a>
              <a href={telLink()} className="btn btn-ghost-dark btn-sm">
                <Phone className="size-3.5" aria-hidden />
                Call Now
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                  {group.title}
                </h2>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.href + item.label}>
                      <Link
                        href={item.href}
                        className="group inline-flex items-start gap-1 text-[14px] leading-snug text-white/60 transition-colors duration-300 hover:text-white"
                      >
                        {item.label}
                        <ArrowUpRight
                          className="mt-0.5 size-3 shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
              Contact
            </h2>
            <ul className="mt-5 space-y-5 text-[14px] text-white/60">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-white/35" aria-hidden />
                <span>
                  {business.address.line1}
                  <br />
                  {business.address.line2}
                  <br />
                  {business.address.city}, {business.address.state}{" "}
                  {business.address.pincode}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-white/35" aria-hidden />
                <a href={telLink()} className="transition-colors hover:text-white">
                  {business.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-white/35" aria-hidden />
                <a
                  href={`mailto:${business.email}`}
                  className="break-all transition-colors hover:text-white"
                >
                  {business.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-white/35" aria-hidden />
                <span>
                  {business.hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}: {h.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* --- Service areas --------------------------------------------- */}
        <div className="mt-14 border-t border-white/10 pt-8">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
            Hyderabad service areas
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
            {business.serviceAreas.map((area) => (
              <li
                key={area}
                className="rounded-full border border-white/10 px-3 py-1.5 text-[12.5px] text-white/50"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>

        {/* --- Bottom ---------------------------------------------------- */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] tracking-[0.04em] text-white/30">
            © {year} {business.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="font-mono text-[11px] tracking-[0.04em] text-white/40 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-[0.04em] text-white/40 transition-colors hover:text-white"
            >
              Directions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
