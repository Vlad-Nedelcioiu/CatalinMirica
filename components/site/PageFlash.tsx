"use client";

import { useEffect, useState } from "react";

/** True once the app has rendered client-side, so the flash fires on
 *  in-app navigations only — never over the initial page load. */
let hasNavigated = false;

/**
 * Camera-flash page transition. Remounted by `app/template.tsx` on every
 * route change: a rhomboid of light covers the page, holds for a beat,
 * then contracts and burns off like a closing aperture (keyframes live in
 * globals.css). The global reduced-motion rule already collapses the CSS
 * animation; the matchMedia check keeps even the first frame from painting.
 */
export function PageFlash() {
  const [active, setActive] = useState(
    () =>
      hasNavigated &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    hasNavigated = true;
  }, []);

  if (!active) return null;

  return (
    <div className="page-flash" aria-hidden="true">
      <div
        className="page-flash__shape"
        onAnimationEnd={() => setActive(false)}
      />
    </div>
  );
}
