import type { Variants } from "framer-motion";

/* ==========================================================================
   Motion tokens
   ==========================================================================
   A single timing vocabulary used by every animated element on the site.
   `ease` values mirror the CSS custom properties in globals.css.
   ========================================================================== */

export const EASE = {
  outExpo: [0.16, 1, 0.3, 1],
  inOutExpo: [0.87, 0, 0.13, 1],
  outSoft: [0.22, 0.61, 0.36, 1],
} as const;

export const DURATION = {
  fast: 0.25,
  base: 0.4,
  slow: 0.6,
  slower: 0.9,
} as const;

export const transition = {
  fast: { duration: DURATION.fast, ease: EASE.outExpo },
  base: { duration: DURATION.base, ease: EASE.outExpo },
  slow: { duration: DURATION.slow, ease: EASE.outExpo },
} as const;

/* ==========================================================================
   Reveal variants — the workhorses of the whole site
   ========================================================================== */

/** Standard fade + rise. Used for most section content. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition.base,
  },
};

/** Slightly longer travel for hero-scale elements. */
export const fadeUpLarge: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition.slow,
  },
};

/** Fade + slide in from the left — asymmetric editorial layouts. */
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: transition.base },
};

/** Fade + slide in from the right — asymmetric editorial layouts. */
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: transition.base },
};

/** Fade only — for text that shouldn't move. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.base },
};

/** Scale in — for images and cards. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: transition.slow },
};

/* ==========================================================================
   Stagger containers
   ========================================================================== */

export const staggerContainer = (
  stagger = 0.08,
  delayChildren = 0.05,
): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const staggerTight = staggerContainer(0.05, 0);
export const staggerMedium = staggerContainer(0.09, 0.05);
export const staggerLoose = staggerContainer(0.14, 0.08);

/* ==========================================================================
   Hero-specific variants
   ========================================================================== */

/** Line-by-line masked reveal for oversized headlines. */
export const heroLine: Variants = {
  hidden: { y: "110%" },
  visible: (i: number = 0) => ({
    y: "0%",
    transition: {
      duration: 1.0,
      ease: EASE.outExpo,
      delay: 0.12 + i * 0.09,
    },
  }),
};

/** Content under the hero headline. */
export const heroContent: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE.outExpo,
      delay: 0.55 + i * 0.09,
    },
  }),
};

/* ==========================================================================
   Media variants
   ========================================================================== */

/** Clip-path reveal — a masked "wipe" for editorial images. */
export const imageReveal: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.1, ease: EASE.inOutExpo },
  },
};

/** Slow, continuous background scale for the hero image. */
export const heroScale: Variants = {
  hidden: { scale: 1.04 },
  visible: {
    scale: 1,
    transition: { duration: 2.4, ease: EASE.outExpo },
  },
};

/* ==========================================================================
   Interaction variants
   ========================================================================== */

/** Applied to the parent of a hover-reveal group. */
export const hoverGroup: Variants = {
  rest: { y: 0 },
  hover: { y: -6, transition: transition.fast },
};

/** Image zoom inside a hover group. */
export const hoverZoom: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.06, transition: { duration: 0.7, ease: EASE.outExpo } },
};

/** Button press feedback. */
export const tapScale: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.97 },
};

/* ==========================================================================
   Shared viewport config
   ========================================================================== */

/**
 * Standard viewport trigger. `once` keeps content revealed after the first
 * view so scrolling back up never re-hides anything.
 */
export const viewportOnce = { once: true, amount: 0.25 } as const;
export const viewportSoft = { once: true, amount: 0.15 } as const;
export const viewportEarly = { once: true, amount: 0.05 } as const;

/* ==========================================================================
   Reduced motion
   ========================================================================== */

/**
 * When the user prefers reduced motion, all animations resolve to an
 * instantly-visible, untransformed state. Content is never hidden.
 */
export const reducedMotionVariants: Variants = {
  hidden: { opacity: 1, y: 0, x: 0, scale: 1, clipPath: "none" },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    clipPath: "none",
    transition: { duration: 0 },
  },
};
