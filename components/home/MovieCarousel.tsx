"use client";

import { Movie } from "@/lib/types";
import MovieCard from "./MovieCard";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  accentColor?: string;
}

export default function MovieCarousel({ title, movies, accentColor = "text-cyan-400" }: MovieCarouselProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between px-6 lg:px-8">
        <h2 className="text-lg font-bold text-slate-100">{title}</h2>
        <button className={`flex items-center gap-1 text-sm font-medium ${accentColor} hover:underline transition-all`}>
          See all <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="px-6 lg:px-8">
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
          {movies.map((movie, i) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <MovieCard movie={movie} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
