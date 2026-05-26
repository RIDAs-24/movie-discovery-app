import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  className?: string;
  variant?: "default" | "cyan" | "violet" | "rose" | "emerald";
}

const variantStyles: Record<string, string> = {
  default: "bg-white/10 text-slate-300 border-white/10",
  cyan: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  violet: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  rose: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  emerald: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

export default function Badge({ label, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {label}
    </span>
  );
}
