"use client";

import { MotionConfig } from "framer-motion";

/**
 * Makes every framer-motion animation honour `prefers-reduced-motion`:
 * transform/layout animations are skipped while opacity crossfades remain.
 * The global CSS rule only covers CSS animations; this covers the JS side.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
