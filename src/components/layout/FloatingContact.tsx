"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { business, telLink, whatsappLink } from "@/config/business";
import { EASE } from "@/lib/motion";

/**
 * Floating WhatsApp / call control.
 *
 * - Bottom-right on desktop, bottom-centre-safe on mobile.
 * - Sits above the mobile safe area and never covers form submit buttons
 *   (it collapses to a single button and hides while scrolling down).
 * - Non-obstructive: collapses to a compact pill, expands on hover/focus.
 */
export function FloatingContact() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y > 320);
      // Hide while scrolling down, reveal when scrolling up.
      setHidden(y > 320 && window.scrollY > lastY.current + 8);
      lastY.current = y;
    };
    const lastY = { current: 0 };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-4 right-4 z-40 flex items-center gap-2.5 sm:bottom-6 sm:right-6"
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{
            opacity: hidden && !expanded ? 0 : 1,
            y: 0,
            scale: 1,
            pointerEvents: hidden && !expanded ? "none" : "auto",
          }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.4, ease: EASE.outExpo }}
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
          onFocus={() => setExpanded(true)}
          onBlur={() => setExpanded(false)}
        >
          <a
            href={telLink()}
            aria-label={`Call ${business.name}`}
            className="hidden size-12 items-center justify-center rounded-full border border-ink-950/10 bg-white text-ink-950 shadow-lift-lg transition-colors duration-300 hover:bg-bone-100 sm:flex"
          >
            <Phone className="size-5" aria-hidden />
          </a>

          <a
            href={whatsappLink(
              "Hi, I'd like to enquire about CCTV services.",
              business.name
            )}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Chat with ${business.name} on WhatsApp`}
            className="group relative flex h-12 items-center gap-0 rounded-full bg-signal-500 pl-0 pr-0 font-medium text-ink-950 shadow-[0_16px_40px_-14px_rgba(37,211,102,0.75)] transition-colors duration-300 hover:bg-signal-400 sm:gap-2.5 sm:pl-4 sm:pr-5"
          >
            <span className="relative flex size-12 items-center justify-center">
              <span
                className="absolute inset-0 rounded-full bg-signal-500/60"
                aria-hidden
                data-pulse
              />
              <MessageCircle className="relative size-5" aria-hidden />
            </span>
            <span
              className="hidden max-w-0 overflow-hidden whitespace-nowrap text-[13.5px] font-semibold tracking-[-0.01em] transition-all duration-400 ease-out-expo group-hover:max-w-[9rem] group-focus-visible:max-w-[9rem] sm:max-w-[9rem]"
            >
              Chat on WhatsApp
            </span>
            <span className="sr-only sm:not-sr-only sm:hidden">
              Chat on WhatsApp
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
