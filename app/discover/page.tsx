"use client";

import { useState, useMemo } from "react";
import { FilterState } from "@/lib/types";
import { MOVIES } from "@/lib/mockData";
import FilterPanel from "@/components/discover/FilterPanel";
import MovieGrid from "@/components/discover/MovieGrid";
import { Search, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DEFAULT_FILTERS: FilterState = {
  yearRange: [1990, 2026],
  ratingRange: [0, 10],
  genres: [],
  languages: [],
  sortBy: "popularity",
};

export default function DiscoverPage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = MOVIES.filter((m) => {
      if (m.releaseYear < filters.yearRange[0] || m.releaseYear > filters.yearRange[1]) return false;
      if (m.voteAverage < filters.ratingRange[0] || m.voteAverage > filters.ratingRange[1]) return false;
      if (filters.genres.length > 0 && !m.genres.some((g) => filters.genres.includes(g.id))) return false;
      if (filters.languages.length > 0 && !filters.languages.includes(m.language)) return false;
      if (search && !m.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });

    result = [...result].sort((a, b) => {
      switch (filters.sortBy) {
        case "rating": return b.voteAverage - a.voteAverage;
        case "releaseDate": return b.releaseYear - a.releaseYear;
        case "revenue": return b.revenue - a.revenue;
        case "title": return a.title.localeCompare(b.title);
        default: return b.popularity - a.popularity;
      }
    });

    return result;
  }, [filters, search]);

  return (
    <div className="px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-white mb-1">Discover Movies</h1>
        <p className="text-slate-400 text-sm">Filter and explore our curated movie collection.</p>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-slate-900/80 border border-white/10 rounded-2xl text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl hover:text-cyan-400 transition-colors"
        >
          <Filter className="w-3.5 h-3.5" />
          Filters
        </button>
      </div>

      <div className="flex gap-6">
        {/* Desktop Filter Panel */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <FilterPanel filters={filters} onChange={setFilters} onReset={() => setFilters(DEFAULT_FILTERS)} />
        </aside>

        {/* Mobile Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden w-full mb-4 overflow-hidden"
            >
              <FilterPanel filters={filters} onChange={setFilters} onReset={() => { setFilters(DEFAULT_FILTERS); setShowFilters(false); }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-400">
              <span className="text-cyan-400 font-bold">{filtered.length}</span> movies found
            </p>
          </div>
          <MovieGrid movies={filtered} />
        </div>
      </div>
    </div>
  );
}
