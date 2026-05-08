"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/**
 * Fades + lifts content into view when it scrolls into the viewport.
 *
 * Renders the same `motion.div` on server and client to avoid hydration
 * mismatches. Reduced-motion users get a zero-duration transition courtesy of
 * `<MotionConfig reducedMotion="user">` in the root layout — content is still
 * visible, the motion just collapses to instant.
 */
export function SectionReveal({ children, className, delay = 0, y = 18 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-80px 0px -40px 0px" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
