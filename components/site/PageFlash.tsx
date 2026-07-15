"use client";

import { useEffect, useState } from "react";

/** True once the app has rendered client-side, so the flash fires on
 *  in-app navigations only — never over the initial page load. */
let hasNavigated = false;

/** Where the star dies: the navbar camera mark, so the blitz reads as the
 *  logo firing. Falls back to viewport center if the mark isn't in the DOM. */
function flashTarget() {
  const mark = document.querySelector("[data-logo-mark]");
  if (!mark) return { tx: 0, ty: 0 };
  const r = mark.getBoundingClientRect();
  return {
    tx: r.left + r.width / 2 - window.innerWidth / 2,
    ty: r.top + r.height / 2 - window.innerHeight / 2,
  };
}

/**
 * Camera-flash page transition. Remounted by `app/template.tsx` on every
 * route change: a full-frame white pop cuts out fast, revealing a four-point
 * lens-glint star that shoots into the navbar camera logo and fades there
 * (keyframes live in globals.css). The global reduced-motion rule already
 * collapses the CSS animation; the matchMedia check keeps even the first
 * frame from painting.
 */
export function PageFlash() {
  const [flash] = useState(() => {
    const active =
      hasNavigated &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // The navbar lives in the persistent layout, so it is measurable even
    // while this new page's subtree is still rendering.
    return active ? flashTarget() : null;
  });
  const [active, setActive] = useState(flash !== null);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  if (!active || !flash) return null;

  return (
    <div className="page-flash" aria-hidden="true">
      <div className="page-flash__pop" />
      {/* the star runs longest, so its animationend retires the overlay */}
      <div
        className="page-flash__star"
        style={
          {
            "--flash-tx": `${flash.tx}px`,
            "--flash-ty": `${flash.ty}px`,
          } as React.CSSProperties
        }
        onAnimationEnd={() => setActive(false)}
      />
    </div>
  );
}
