"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

type ButtonLikeProps = {
  children: ReactNode;
  className?: string;
  /** Shared group for hover coordination with icons. */
  children2?: never;
} & Record<string, unknown>;

type Props = ButtonLikeProps & {
  href?: string;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  "aria-label"?: string;
};

/**
 * Motion-enabled link/button with hover + tap feedback.
 *
 * Renders an `<a>` when `href` is provided (so it stays a real link for
 * keyboard and screen-reader users) and a `<button>` otherwise.
 */
export function MotionButton({
  children,
  className,
  href,
  external,
  onClick,
  type = "button",
  disabled,
  ...rest
}: Props) {
  const reduce = useReducedMotion();

  const motionProps = {
    whileHover: reduce ? undefined : { y: -2 },
    whileTap: reduce ? undefined : { scale: 0.97 },
    transition: { duration: 0.25, ease: EASE.outExpo },
  };

  if (href) {
    const isExternal = external ?? href.startsWith("http");
    return (
      <motion.a
        href={href}
        className={cn(className)}
        {...motionProps}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...rest}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={cn(className)}
      onClick={onClick}
      disabled={disabled}
      {...motionProps}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
