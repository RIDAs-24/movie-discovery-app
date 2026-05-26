"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { GENRE_MARKET_SHARE } from "@/lib/mockData";

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { color: string } }> }) => {
  if (!active || !payload?.[0]) return null;
  const d = payload[0];
  return (
    <div className="rounded-xl bg-slate-900 border border-white/10 p-3 shadow-xl text-xs">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.payload.color }} />
        <span className="font-semibold text-slate-200">{d.name}</span>
      </div>
      <p className="text-slate-400 mt-1">Market share: <span className="text-white font-bold">{d.value}%</span></p>
    </div>
  );
};

export default function GenreMarketShareChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={GENRE_MARKET_SHARE}
            cx="50%"
            cy="50%"
            innerRadius="55%"
            outerRadius="80%"
            paddingAngle={3}
            dataKey="share"
            nameKey="genre"
          >
            {GENRE_MARKET_SHARE.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 11, color: "#94a3b8" }}
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
