"use client";

import { Movie } from "@/lib/types";
import { motion } from "framer-motion";
import { Star, Clock, Calendar, DollarSign, Film, User, ArrowLeft, Award } from "lucide-react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import CastCard from "./CastCard";
import RatingComponent from "./RatingComponent";
import { formatMoney, formatRuntime, ratingColor } from "@/lib/utils";

interface MovieDetailPanelProps {
  movie: Movie;
}

const PANEL_GRADIENTS = [
  "from-blue-950", "from-violet-950", "from-cyan-950",
  "from-rose-950", "from-amber-950", "from-emerald-950",
];

export default function MovieDetailPanel({ movie }: MovieDetailPanelProps) {
  const grad = PANEL_GRADIENTS[movie.id % PANEL_GRADIENTS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-6 lg:px-8 py-8 space-y-8"
    >
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      {/* Hero Banner */}
      <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${grad} via-slate-900 to-slate-950 border border-white/10`}>
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] select-none">
          <span className="text-[28rem] font-black text-white leading-none">{movie.title[0]}</span>
        </div>
        <div className="relative z-10 p-8 lg:p-10">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 bg-cyan-500/15 border border-cyan-500/30 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              {movie.status}
            </span>
            {movie.genres.map((g) => (
              <Badge key={g.id} label={g.name} variant="violet" />
            ))}
          </div>

          <h1 className="text-4xl lg:text-5xl font-black text-white mb-2 leading-tight">{movie.title}</h1>
          <p className="text-slate-400 italic mb-6">&ldquo;{movie.tagline}&rdquo;</p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-5 text-sm">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className={`font-bold text-base ${ratingColor(movie.voteAverage)}`}>{movie.voteAverage.toFixed(1)}</span>
              <span className="text-slate-500">/ 10 ({movie.voteCount.toLocaleString()} votes)</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-4 h-4" />{formatRuntime(movie.runtime)}
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Calendar className="w-4 h-4" />{movie.releaseDate}
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <User className="w-4 h-4" />{movie.director}
            </div>
          </div>
        </div>
      </div>

      {/* Overview + Rating */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl bg-slate-900/80 border border-white/5 p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Film className="w-4 h-4 text-cyan-400" /> Overview
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">{movie.overview}</p>
          <RatingComponent />
        </div>

        {/* Financial Stats */}
        <div className="rounded-2xl bg-slate-900/80 border border-white/5 p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" /> Box Office
          </h2>
          <div className="space-y-3">
            {[
              { label: "Budget", value: formatMoney(movie.budget), color: "text-cyan-400" },
              { label: "Revenue", value: formatMoney(movie.revenue), color: "text-emerald-400" },
              { label: "ROI", value: `${((movie.revenue / movie.budget) * 100).toFixed(0)}%`, color: "text-violet-400" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-xs text-slate-500">{item.label}</span>
                <span className={`text-sm font-bold ${item.color}`}>{item.value}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-white/5">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-slate-400">Critic Score</span>
              <span className="ml-auto font-bold text-amber-400">{movie.criticScore}/100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cast */}
      <div className="rounded-2xl bg-slate-900/80 border border-white/5 p-6">
        <h2 className="text-base font-bold text-white mb-5">Cast</h2>
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-2">
          {movie.cast.map((member) => (
            <CastCard key={member.id} cast={member} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
