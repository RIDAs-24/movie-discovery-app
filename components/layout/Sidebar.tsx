"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Film, Home, BarChart3, Compass, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Discover", href: "/discover", icon: Compass },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen fixed left-0 top-0 z-30 bg-slate-950/95 backdrop-blur-md border-r border-white/8 p-6">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 mb-10 group">
        <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/30 group-hover:bg-cyan-500/30 transition-colors">
          <Film className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <span className="text-xl font-bold gradient-text">CineScope</span>
          <p className="text-xs text-slate-500 -mt-0.5">Movie Discovery</p>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        <p className="text-xs text-slate-600 uppercase tracking-widest font-semibold mb-3 px-3">Menu</p>
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                active
                  ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 shadow-lg shadow-cyan-500/5"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              )}
            >
              <Icon className={cn("w-4 h-4 flex-shrink-0", active && "text-cyan-400")} />
              {label}
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Stats Teaser */}
      <div className="mt-auto rounded-xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 border border-white/10 p-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-violet-400" />
          <span className="text-xs font-semibold text-violet-400">Trending Now</span>
        </div>
        <p className="text-xs text-slate-400">2024 box office revenue up <span className="text-emerald-400 font-semibold">+7%</span> year-over-year.</p>
      </div>

      <p className="text-xs text-slate-600 mt-4 text-center">© 2025 CineScope</p>
    </aside>
  );
}
