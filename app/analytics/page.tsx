import dynamic from "next/dynamic";
import StatCard from "@/components/analytics/StatCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movie Insights — CineScope Analytics",
  description: "Explore box office trends, rating comparisons, and genre market share analytics.",
};

// Dynamically import charts with ssr: false to avoid Recharts SSR issues
const BoxOfficeTrendChart = dynamic(
  () => import("@/components/analytics/BoxOfficeTrendChart"),
  { ssr: false, loading: () => <ChartSkeleton /> }
);
const RatingsComparisonChart = dynamic(
  () => import("@/components/analytics/RatingsComparisonChart"),
  { ssr: false, loading: () => <ChartSkeleton /> }
);
const GenreMarketShareChart = dynamic(
  () => import("@/components/analytics/GenreMarketShareChart"),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

function ChartSkeleton() {
  return (
    <div className="h-[300px] w-full rounded-xl bg-white/5 animate-pulse" />
  );
}

const STATS = [
  { label: "Total Films Tracked", value: "12,400+", subValue: "Updated May 2025", trend: "up" as const, trendValue: "+340 this month" },
  { label: "Avg User Rating", value: "7.8", subValue: "Across all genres", trend: "up" as const, trendValue: "+0.2 vs last year" },
  { label: "Global Box Office", value: "$16.5B", subValue: "FY 2024", trend: "up" as const, trendValue: "+7% YoY" },
  { label: "Top Genre", value: "Action", subValue: "28% market share", trend: "neutral" as const, trendValue: "Stable" },
];

export default function AnalyticsPage() {
  return (
    <div className="px-6 lg:px-8 py-8 space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black text-white mb-1">Movie Insights</h1>
        <p className="text-slate-400 text-sm">Global box office trends, rating analytics, and genre market intelligence.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <StatCard key={s.label} {...s} delay={i * 0.1} />
        ))}
      </div>

      {/* Box Office Trend */}
      <div className="rounded-2xl bg-slate-900/80 border border-white/5 p-6">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-white">Box Office Trends</h2>
          <p className="text-xs text-slate-500 mt-0.5">Global revenue 2014–2024 (USD Millions)</p>
        </div>
        <BoxOfficeTrendChart />
      </div>

      {/* Bottom two charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-slate-900/80 border border-white/5 p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-white">User vs Critic Ratings</h2>
            <p className="text-xs text-slate-500 mt-0.5">Average scores by genre (0–10 scale)</p>
          </div>
          <RatingsComparisonChart />
        </div>

        <div className="rounded-2xl bg-slate-900/80 border border-white/5 p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-white">Genre Market Share</h2>
            <p className="text-xs text-slate-500 mt-0.5">Global revenue distribution by genre</p>
          </div>
          <GenreMarketShareChart />
        </div>
      </div>
    </div>
  );
}
