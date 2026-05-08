"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Wraps the tree so framer-motion automatically respects the user's
 * `prefers-reduced-motion` setting. With `reducedMotion="user"`, all framer
 * animations collapse to zero duration when the OS opt-out is on — no need
 * for per-component `useReducedMotion` branches.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
