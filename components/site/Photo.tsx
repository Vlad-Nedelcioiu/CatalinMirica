"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { Aperture } from "lucide-react";

/** Neutral sand-toned blur-up placeholder (8×8 SVG). */
const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNlY2U1ZDgiLz48L3N2Zz4=";

/**
 * next/image for the remote (Unsplash) photography: blur-up placeholder while
 * loading, and a quiet branded panel instead of a broken-image glyph if the
 * source ever 404s. Use with `fill` inside a relatively-positioned frame.
 */
export function Photo({
  alt,
  ...props
}: Omit<ImageProps, "placeholder" | "blurDataURL" | "onError">) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span role="img" aria-label={alt} className="absolute inset-0 grid place-items-center bg-sand">
        <Aperture className="h-8 w-8 text-muted-deep" strokeWidth={1.25} aria-hidden />
      </span>
    );
  }

  return (
    <Image
      alt={alt}
      placeholder="blur"
      blurDataURL={BLUR}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
