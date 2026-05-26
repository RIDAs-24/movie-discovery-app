"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  subValue: string;
  trend: "up" | "down" | "neutral";
  trendValue: string;
  delay?: number;
}

export default function StatCard({ label, value, subValue, trend, trendValue, delay = 0 }: StatCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = trend === "up" ? "text-emerald-400" : trend === "down" ? "text-rose-400" : "text-slate-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="rounded-2xl bg-slate-900/80 border border-white/5 p-5 space-y-3"
    >
      <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">{label}</p>
      <p className="text-3xl font-black text-white">{value}</p>
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-400">{subValue}</p>
        <div className={`flex items-center gap-1 text-xs font-semibold ${trendColor}`}>
          <TrendIcon className="w-3.5 h-3.5" />
          {trendValue}
        </div>
      </div>
    </motion.div>
  );
}
