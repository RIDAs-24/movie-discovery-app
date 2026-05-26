"use client";

import { useState } from "react";
import { Menu, Search, Bell, Film } from "lucide-react";
import MobileNav from "./MobileNav";
import Link from "next/link";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="lg:hidden sticky top-0 z-30 flex items-center gap-3 px-4 py-3 bg-slate-950/90 backdrop-blur-md border-b border-white/8">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-400"
          aria-label="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link href="/" className="flex items-center gap-2 mr-auto">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
            <Film className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="font-bold gradient-text text-sm">CineScope</span>
        </Link>

        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-400" aria-label="Search">
          <Search className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-400 relative" aria-label="Notifications">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400" />
        </button>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
