"use client";

import { FilterState } from "@/lib/types";
import { GENRES, LANGUAGES } from "@/lib/mockData";
import RangeSlider from "@/components/ui/RangeSlider";
import { cn } from "@/lib/utils";
import { SlidersHorizontal, X } from "lucide-react";

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
}

export default function FilterPanel({ filters, onChange, onReset }: FilterPanelProps) {
  const toggleGenre = (id: number) => {
    const genres = filters.genres.includes(id)
      ? filters.genres.filter((g) => g !== id)
      : [...filters.genres, id];
    onChange({ ...filters, genres });
  };

  const toggleLanguage = (code: string) => {
    const languages = filters.languages.includes(code)
      ? filters.languages.filter((l) => l !== code)
      : [...filters.languages, code];
    onChange({ ...filters, languages });
  };

  return (
    <div className="rounded-2xl bg-slate-900/80 border border-white/5 p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-bold text-slate-200">Filters</span>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-rose-400 transition-colors"
        >
          <X className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Year Range */}
      <RangeSlider
        label="Release Year"
        min={1990}
        max={2026}
        value={filters.yearRange}
        onChange={(v) => onChange({ ...filters, yearRange: v })}
      />

      {/* Rating Range */}
      <RangeSlider
        label="Rating"
        min={0}
        max={10}
        step={0.5}
        value={filters.ratingRange}
        onChange={(v) => onChange({ ...filters, ratingRange: v })}
        formatValue={(v) => v.toFixed(1)}
      />

      {/* Languages */}
      <div className="space-y-2">
        <span className="text-sm font-medium text-slate-300">Language</span>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((lang) => {
            const active = filters.languages.includes(lang.code);
            return (
              <button
                key={lang.code}
                onClick={() => toggleLanguage(lang.code)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200",
                  active
                    ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/40"
                    : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20"
                )}
              >
                {lang.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Genres */}
      <div className="space-y-2">
        <span className="text-sm font-medium text-slate-300">Genre</span>
        <div className="flex flex-wrap gap-2">
          {GENRES.map((genre) => {
            const active = filters.genres.includes(genre.id);
            return (
              <button
                key={genre.id}
                onClick={() => toggleGenre(genre.id)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200",
                  active
                    ? "bg-violet-500/20 text-violet-400 border-violet-500/40"
                    : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20"
                )}
              >
                {genre.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sort */}
      <div className="space-y-2">
        <span className="text-sm font-medium text-slate-300">Sort By</span>
        <select
          value={filters.sortBy}
          onChange={(e) => onChange({ ...filters, sortBy: e.target.value as FilterState["sortBy"] })}
          className="w-full bg-slate-800 border border-white/10 text-slate-300 text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500/50"
        >
          <option value="popularity">Popularity</option>
          <option value="rating">Rating</option>
          <option value="releaseDate">Release Date</option>
          <option value="revenue">Revenue</option>
          <option value="title">Title (A–Z)</option>
        </select>
      </div>
    </div>
  );
}
