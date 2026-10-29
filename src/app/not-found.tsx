import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { business, whatsappLink } from "@/config/business";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-ink-950">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid opacity-40"
        aria-hidden
      />
      <div className="relative shell py-24 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/40">
          Error 404
        </p>
        <h1 className="mt-6 font-display text-display-lg font-semibold text-white">
          This page isn&apos;t
          <br className="hidden sm:block" />{" "}
          <span className="text-white/40">under surveillance.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-[16.5px] leading-relaxed text-white/55">
          The page you were looking for has moved or never existed. Head back to the
          homepage, or talk to us directly.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link href="/" className="btn btn-electric group">
            Back to homepage
            <ArrowRight
              className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
          <a
            href={whatsappLink("Hi, I couldn't find what I was looking for.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost-dark"
          >
            Message {business.name}
          </a>
        </div>
      </div>
    </section>
  );
}
