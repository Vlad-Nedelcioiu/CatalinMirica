import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "brass" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 ease-[var(--ease-out-soft)] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-ink text-cream hover:bg-ink/90 shadow-card",
  brass: "bg-brass text-white hover:bg-brass/90 shadow-card",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-cream",
  ghost: "text-ink hover:text-brass-deep",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm",
};

/** Reusable class string so the same look can be applied to a <Link> too. */
export function buttonClasses(opts: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  const { variant = "primary", size = "md", className } = opts;
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant,
  size,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return <button className={buttonClasses({ variant, size, className })} {...props} />;
}
