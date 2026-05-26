"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5",
        hover && "transition-all duration-300 hover:bg-white/8 hover:border-white/20 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
