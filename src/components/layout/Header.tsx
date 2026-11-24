"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { navItems } from "@/config/navigation";
import { business, telLink, whatsappLink } from "@/config/business";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  /* --- Scroll state (passive listener, rAF-throttled) ------------------ */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* --- Lock body scroll while the mobile sheet is open ----------------- */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /* --- Escape closes the sheet ----------------------------------------- */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ease-out-expo",
          solid
            ? "border-b border-ink-950/8 bg-white/85 backdrop-blur-xl shadow-[0_1px_24px_-12px_rgba(7,9,14,0.25)]"
            : "border-b border-transparent bg-transparent"
        )}
        initial={reduce ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE.outExpo, delay: 0.1 }}
      >
        <div className="shell">
          <div
            className={cn(
              "flex items-center justify-between transition-[height] duration-500 ease-out-expo",
              scrolled ? "h-[68px] lg:h-[74px]" : "h-[76px] lg:h-[88px]"
            )}
          >
            {/* --- Logo --------------------------------------------------- */}
            <Link
              href="/"
              className="group flex items-center gap-3 rounded-md"
              aria-label={`${business.name} — home`}
            >
              <Logo
                withWordmark
                tagline={business.tagline}
                tone={solid ? "dark" : "light"}
                size={solid ? 46 : 52}
                className="gap-3"
              />
            </Link>

            {/* --- Desktop nav -------------------------------------------- */}
            <nav
              className="hidden items-center gap-1 lg:flex"
              aria-label="Primary"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative rounded-md px-3.5 py-2 text-[13.5px] font-medium tracking-[-0.01em] transition-colors duration-300",
                    solid
                      ? "text-ink-700 hover:text-ink-950"
                      : "text-white/75 hover:text-white"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute bottom-1 left-3.5 h-px w-0 transition-all duration-300 ease-out-expo group-hover:w-[calc(100%-1.75rem)]",
                      solid ? "bg-ink-950" : "bg-white"
                    )}
                  />
                </Link>
              ))}
            </nav>

            {/* --- Desktop actions ---------------------------------------- */}
            <div className="hidden items-center gap-3 lg:flex">
              <a
                href={telLink()}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3 py-2 font-mono text-[12px] tracking-[0.06em] transition-colors duration-300",
                  solid
                    ? "text-ink-600 hover:text-ink-950"
                    : "text-white/70 hover:text-white"
                )}
                aria-label={`Call ${business.name} at ${business.phoneDisplay}`}
              >
                <Phone className="size-3.5" aria-hidden />
                {business.phoneDisplay}
              </a>
              <Link
                href="/contact#quote"
                className="btn btn-sm bg-ink-950 px-5 py-2.5 text-white hover:bg-navy-700 focus-visible:ring-offset-white"
              >
                Get a Free Quote
              </Link>
            </div>

            {/* --- Mobile trigger ---------------------------------------- */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden",
                solid
                  ? "border-ink-950/10 bg-white text-ink-950"
                  : "border-white/20 bg-white/[0.06] text-white backdrop-blur-md"
              )}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? (
                <X className="size-5" aria-hidden />
              ) : (
                <Menu className="size-5" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* --- Mobile sheet ------------------------------------------------ */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-ink-950/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              id="mobile-nav"
              className="fixed inset-x-0 top-[68px] z-40 max-h-[calc(100dvh-68px)] overflow-y-auto border-b border-ink-950/10 bg-white lg:hidden"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE.outExpo }}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
            >
              <nav className="shell flex flex-col py-6" aria-label="Mobile">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: EASE.outExpo,
                      delay: 0.06 + i * 0.05,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between border-b border-ink-950/6 py-4 font-display text-2xl tracking-[-0.012em] text-ink-950"
                    >
                      {item.label}
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400">
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  className="mt-7 flex flex-col gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE.outExpo, delay: 0.4 }}
                >
                  <Link
                    href="/contact#quote"
                    onClick={() => setOpen(false)}
                    className="btn btn-primary w-full"
                  >
                    Get a Free Quote
                  </Link>
                  <a
                    href={whatsappLink(
                      "Hi, I'd like to discuss a CCTV installation.",
                      business.name
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp w-full"
                  >
                    Chat on WhatsApp
                  </a>
                  <a
                    href={telLink()}
                    className="btn btn-outline w-full"
                  >
                    <Phone className="size-4" aria-hidden />
                    {business.phoneDisplay}
                  </a>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
