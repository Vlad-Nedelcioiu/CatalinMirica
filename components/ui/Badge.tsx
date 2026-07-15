import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
  tone = "neutral",
}: {
  className?: string;
  children: React.ReactNode;
  tone?: "neutral" | "brass" | "ink";
}) {
  const tones = {
    neutral: "border-line bg-paper text-ink-soft",
    brass: "border-brass/30 bg-brass/10 text-brass-deep",
    ink: "border-transparent bg-ink text-cream",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
