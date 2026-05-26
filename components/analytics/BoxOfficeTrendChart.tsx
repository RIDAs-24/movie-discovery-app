"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BOX_OFFICE_TRENDS } from "@/lib/mockData";

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (!active || !payload) return null;
  return (
    <div className="rounded-xl bg-slate-900 border border-white/10 p-3 shadow-xl text-xs">
      <p className="font-bold text-slate-200 mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-400">{p.name}:</span>
          <span className="font-semibold text-slate-200">${p.value.toLocaleString()}M</span>
        </div>
      ))}
    </div>
  );
};

export default function BoxOfficeTrendChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={BOX_OFFICE_TRENDS} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
          <XAxis dataKey="year" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
          <Line type="monotone" dataKey="domestic" name="Domestic" stroke="#06b6d4" strokeWidth={2.5} dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
          <Line type="monotone" dataKey="international" name="International" stroke="#8b5cf6" strokeWidth={2.5} dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
          <Line type="monotone" dataKey="total" name="Total" stroke="#10b981" strokeWidth={2.5} strokeDasharray="6 3" dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
