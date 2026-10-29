"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in seconds. */
  delay?: number;
  /** Stagger children instead of animating the block as one. */
  stagger?: boolean;
  variants?: Variants;
  as?: ElementType;
  once?: boolean;
  amount?: number;
};

/**
 * The site's scroll-reveal primitive.
 *
 * Animates opacity + transform only and triggers once via Motion's
 * IntersectionObserver-backed `whileInView`.
 *
 * When the user prefers reduced motion we do NOT wait for a scroll trigger —
 * content is rendered in its final, visible state on the first paint, so
 * nothing is ever hidden behind an animation that will not run.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  stagger = false,
  variants,
  as = "div",
  once = true,
  amount,
}: RevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as as keyof typeof motion] as typeof motion.div;

  /* --- Reduced motion: render the end state immediately ---------------- */
  if (reduce) {
    return (
      <Component
        className={cn(className)}
        initial={false}
        animate={{ opacity: 1, y: 0, x: 0, scale: 1, clipPath: "none" }}
        transition={{ duration: 0 }}
      >
        {children}
      </Component>
    );
  }

  /* --- Normal: scroll-triggered reveal --------------------------------- */
  const resolved = variants ?? fadeUp;
  const container = stagger ? staggerContainer(0.09, delay) : undefined;

  return (
    <Component
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: amount ?? viewportOnce.amount }}
      variants={container ?? resolved}
      transition={delay && !stagger ? { delay } : undefined}
    >
      {children}
    </Component>
  );
}
