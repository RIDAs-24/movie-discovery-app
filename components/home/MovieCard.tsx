"use client";

import { Movie } from "@/lib/types";
import { ratingColor, formatRuntime } from "@/lib/utils";
import { Star, Clock, Calendar, Play } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Badge from "@/components/ui/Badge";

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

const FALLBACK_GRADIENTS = [
  "from-blue-900 via-slate-900 to-slate-950",
  "from-violet-900 via-slate-900 to-slate-950",
  "from-cyan-900 via-slate-900 to-slate-950",
  "from-rose-900 via-slate-900 to-slate-950",
  "from-amber-900 via-slate-900 to-slate-950",
  "from-emerald-900 via-slate-900 to-slate-950",
];

export default function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const gradient = FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length];

  return (
    <Link href={`/movie/${movie.id}`} className="block flex-shrink-0 w-44">
      <motion.div
        whileHover={{ y: -8, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative rounded-2xl overflow-hidden bg-slate-900/80 border border-white/5 cursor-pointer"
      >
        {/* Poster */}
        <div className="relative h-64 w-full">
          {movie.posterPath ? (
            <Image
              src={movie.posterPath}
              alt={movie.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="176px"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-b ${gradient} flex items-center justify-center`}>
              <span className="text-6xl font-black text-white/20 select-none">{movie.title[0]}</span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />

          {/* Hover overlay — "View Details" */}
          <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-all duration-300 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center gap-1.5"
            >
              <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <Play className="w-4 h-4 text-slate-950 fill-slate-950 ml-0.5" />
              </div>
              <span className="text-xs font-bold text-white bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm">
                View Details
              </span>
            </motion.div>
          </div>

          {/* Rating badge */}
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 rounded-lg px-2 py-1 backdrop-blur-sm">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className={`text-xs font-bold ${ratingColor(movie.voteAverage)}`}>
              {movie.voteAverage.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-3 space-y-2">
          <h3 className="text-xs font-semibold text-slate-100 line-clamp-2 leading-tight group-hover:text-cyan-300 transition-colors">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 text-slate-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span className="text-xs">{movie.releaseYear}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span className="text-xs">{formatRuntime(movie.runtime)}</span>
            </div>
          </div>
          {movie.genres[0] && (
            <Badge label={movie.genres[0].name} variant="cyan" className="text-[10px]" />
          )}
        </div>

        {/* Hover ring */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-cyan-500/0 group-hover:ring-cyan-500/40 transition-all duration-300 pointer-events-none" />
      </motion.div>
    </Link>
  );
}
