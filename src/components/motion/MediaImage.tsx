"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  /** Slow zoom on hover — use inside a group-hover parent. */
  zoomOnHover?: boolean;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  /** Subtle parallax offset on scroll. Disabled on mobile / reduced motion. */
  parallax?: boolean;
};

export function MediaImage({
  src,
  alt,
  className,
  imageClassName,
  zoomOnHover = false,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  quality = 82,
  parallax = false,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("relative overflow-hidden bg-ink-900", className)}>
      <motion.div
        className={cn("relative size-full", zoomOnHover && "transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.06]")}
        initial={parallax && !reduce ? { y: "-4%" } : false}
        whileInView={
          parallax && !reduce ? { y: "4%" } : undefined
        }
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.4, ease: EASE_OUT }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={quality}
          sizes={sizes}
          className={cn("size-full object-cover", imageClassName)}
        />
      </motion.div>
    </div>
  );
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
