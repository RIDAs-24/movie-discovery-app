"use client";

import { Movie } from "@/lib/types";
import { motion } from "framer-motion";
import { Play, Star, Clock, Info } from "lucide-react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { formatRuntime, ratingColor } from "@/lib/utils";

interface HeroSectionProps {
  movie: Movie;
}

const HERO_GRADIENTS = [
  "from-blue-950 via-slate-900",
  "from-violet-950 via-slate-900",
  "from-cyan-950 via-slate-900",
];

export default function HeroSection({ movie }: HeroSectionProps) {
  return (
    <section className="relative w-full h-[500px] lg:h-[560px] overflow-hidden">
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${HERO_GRADIENTS[movie.id % 3]} to-slate-950`} />

      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />

      {/* Large letter background */}
      <div className="absolute inset-0 flex items-center justify-end pr-8 lg:pr-16 opacity-[0.04] select-none pointer-events-none">
        <span className="text-[20rem] font-black text-white leading-none">{movie.title[0]}</span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full px-6 lg:px-10 pb-10">
        {/* Trending Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 mb-4"
        >
          <span className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 bg-cyan-500/15 border border-cyan-500/30 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            #1 Trending This Week
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl lg:text-6xl font-black text-white mb-2 leading-none"
        >
          {movie.title}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-slate-400 italic text-sm lg:text-base mb-4"
        >
          &ldquo;{movie.tagline}&rdquo;
        </motion.p>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center gap-3 mb-5"
        >
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className={`font-bold ${ratingColor(movie.voteAverage)}`}>{movie.voteAverage.toFixed(1)}</span>
            <span className="text-slate-500 text-sm">/ 10</span>
          </div>
          <span className="text-slate-600">•</span>
          <div className="flex items-center gap-1 text-slate-400 text-sm">
            <Clock className="w-4 h-4" />
            {formatRuntime(movie.runtime)}
          </div>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400 text-sm">{movie.releaseYear}</span>
          {movie.genres.map((g) => (
            <Badge key={g.id} label={g.name} variant="violet" />
          ))}
        </motion.div>

        {/* Overview */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-slate-300 text-sm lg:text-base max-w-xl mb-6 line-clamp-2"
        >
          {movie.overview}
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-3"
        >
          <Link
            href={`/movies/${movie.id}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all duration-200 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/40 hover:scale-105"
          >
            <Play className="w-4 h-4 fill-current" />
            View Details
          </Link>
          <Link
            href="/discover"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-slate-200 font-semibold text-sm transition-all duration-200"
          >
            <Info className="w-4 h-4" />
            Discover More
          </Link>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </section>
  );
}
