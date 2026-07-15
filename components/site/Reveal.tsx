"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
} & Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "transition">;

/**
 * Fade + slide content into view once. Reduced-motion is honoured by the
 * MotionProvider (MotionConfig reducedMotion="user") in the root layout;
 * `data-reveal` lets the layout's <noscript> rule force visibility without JS.
 */
export function Reveal({ children, className, delay = 0, y = 26, ...props }: RevealProps) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
