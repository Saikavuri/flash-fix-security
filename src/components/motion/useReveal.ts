"use client";

import { useReducedMotion } from "framer-motion";

type Vec = { opacity?: number; y?: number; x?: number; scale?: number };

type Options = {
  delay?: number;
  duration?: number;
  /** Viewport amount that triggers the reveal. */
  amount?: number;
};

/**
 * Reduced-motion aware reveal props for a single element.
 *
 * When the user prefers reduced motion we must never hide content waiting
 * for a scroll trigger — so instead of `initial`/`whileInView` we switch to
 * `animate` with a zero-duration transition, which paints the final state on
 * the very first frame at any scroll position.
 *
 * Usage:
 *   const reveal = useReveal();
 *   <motion.h2 {...reveal({ opacity: 0, y: 24 }, { opacity: 1, y: 0 }, { delay: 0.06 })}>
 */
export function useReveal() {
  const reduce = useReducedMotion();

  return function reveal(
    hidden: Vec = { opacity: 0, y: 24 },
    visible: Vec = { opacity: 1, y: 0 },
    options: Options = {}
  ) {
    if (reduce) {
      return {
        initial: false as const,
        animate: {
          opacity: visible.opacity ?? 1,
          y: visible.y ?? 0,
          x: visible.x ?? 0,
          scale: visible.scale ?? 1,
        },
        transition: { duration: 0 },
      };
    }

    return {
      initial: hidden,
      whileInView: visible,
      viewport: { once: true, amount: options.amount ?? 0.25 },
      transition: {
        duration: options.duration ?? 0.7,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay: options.delay ?? 0,
      },
    };
  };
}
