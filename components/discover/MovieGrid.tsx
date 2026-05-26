"use client";

import { Movie } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Clock, Calendar, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import { ratingColor, formatRuntime } from "@/lib/utils";

interface MovieGridProps {
  movies: Movie[];
}

const CARD_GRADIENTS = [
  "from-blue-900", "from-violet-900", "from-cyan-900", "from-rose-900",
  "from-amber-900", "from-emerald-900", "from-indigo-900", "from-teal-900",
];

export default function MovieGrid({ movies }: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500">
        <p className="text-5xl mb-4">🎬</p>
        <p className="font-semibold text-slate-400">No movies match your filters</p>
        <p className="text-sm mt-1">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
      <AnimatePresence mode="popLayout">
        {movies.map((movie, i) => {
          const grad = CARD_GRADIENTS[i % CARD_GRADIENTS.length];
          return (
            <motion.div
              key={movie.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25, delay: i < 8 ? i * 0.04 : 0 }}
            >
              <Link href={`/movie/${movie.id}`} className="block">
                <div className="group rounded-2xl overflow-hidden bg-slate-900/80 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer">
                  {/* Poster */}
                  <div className="relative h-[220px] w-full">
                    {movie.posterPath ? (
                      <Image
                        src={movie.posterPath}
                        alt={movie.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-b ${grad} via-slate-900 to-slate-950 flex items-center justify-center`}>
                        <span className="text-7xl font-black text-white/10 select-none">{movie.title[0]}</span>
                      </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/60">
                          <Play className="w-5 h-5 text-slate-950 fill-slate-950 ml-0.5" />
                        </div>
                        <span className="text-xs font-bold text-white bg-black/70 px-3 py-1 rounded-full backdrop-blur-sm">
                          View Details
                        </span>
                      </div>
                    </div>

                    {/* Rating badge */}
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 rounded-lg px-2 py-1 backdrop-blur-sm">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className={`text-xs font-bold ${ratingColor(movie.voteAverage)}`}>
                        {movie.voteAverage.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3 space-y-2">
                    <h3 className="text-sm font-semibold text-slate-100 line-clamp-1 group-hover:text-cyan-300 transition-colors">
                      {movie.title}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                      <div className="flex items-center gap-1"><Calendar className="w-3 h-3" />{movie.releaseYear}</div>
                      <div className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatRuntime(movie.runtime)}</div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {movie.genres.slice(0, 2).map((g) => (
                        <Badge key={g.id} label={g.name} variant="cyan" className="text-[10px]" />
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
