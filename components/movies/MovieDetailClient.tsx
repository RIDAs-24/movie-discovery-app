"use client";

import { Movie } from "@/lib/types";
import { TMDBMovieDetail } from "@/lib/tmdb";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, Star, Clock, Calendar, User, DollarSign,
  Award, Film, PlayCircle, TrendingUp,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import RatingComponent from "@/components/movies/RatingComponent";
import { formatMoney, formatRuntime, ratingColor } from "@/lib/utils";

interface Props {
  movie: Movie;
  tmdb: TMDBMovieDetail | null;
}

const PANEL_GRADIENTS = [
  "from-blue-950", "from-violet-950", "from-cyan-950",
  "from-rose-950", "from-amber-950", "from-emerald-950",
];

export default function MovieDetailClient({ movie, tmdb }: Props) {
  const grad = PANEL_GRADIENTS[movie.id % PANEL_GRADIENTS.length];

  // Trailer — prefer official YouTube trailer from TMDB
  const trailer = tmdb?.videos?.results.find(
    (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser") && v.official
  ) ?? tmdb?.videos?.results.find((v) => v.site === "YouTube");

  // Similar movies from TMDB or empty
  const similar = tmdb?.similar?.results.slice(0, 6) ?? [];

  const fade = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

  return (
    <div className="max-w-5xl mx-auto pb-16">
      {/* ── BACKDROP ─────────────────────────────────────────── */}
      <div className="relative h-[400px] lg:h-[480px] w-full overflow-hidden">
        {movie.backdropPath ? (
          <Image
            src={movie.backdropPath}
            alt={movie.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${grad} via-slate-900 to-slate-950`}>
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]">
              <span className="text-[28rem] font-black text-white leading-none">{movie.title[0]}</span>
            </div>
          </div>
        )}
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 to-transparent" />
      </div>

      {/* ── HERO CONTENT (overlaps backdrop) ─────────────────── */}
      <div className="relative -mt-48 lg:-mt-56 px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row gap-6 items-end sm:items-end">
          {/* Poster */}
          <motion.div
            {...fade}
            transition={{ delay: 0.1 }}
            className="flex-shrink-0 w-32 sm:w-44 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-black/50"
          >
            <div className="relative aspect-[2/3]">
              {movie.posterPath ? (
                <Image src={movie.posterPath} alt={movie.title} fill className="object-cover" sizes="176px" />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-b ${grad} flex items-center justify-center`}>
                  <span className="text-5xl font-black text-white/20">{movie.title[0]}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Title block */}
          <div className="flex-1 min-w-0 pb-1">
            {/* Back */}
            <motion.div {...fade} transition={{ delay: 0.05 }} className="mb-3">
              <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors group">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </motion.div>

            {/* Status + genres */}
            <motion.div {...fade} transition={{ delay: 0.15 }} className="flex flex-wrap gap-2 mb-3">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 bg-cyan-500/15 border border-cyan-500/30 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                {movie.status}
              </span>
              {movie.genres.map((g) => <Badge key={g.id} label={g.name} variant="violet" />)}
            </motion.div>

            <motion.h1 {...fade} transition={{ delay: 0.2 }} className="text-3xl lg:text-5xl font-black text-white leading-tight mb-1">
              {movie.title}
            </motion.h1>

            {movie.tagline && (
              <motion.p {...fade} transition={{ delay: 0.25 }} className="text-slate-400 italic text-sm mb-3">
                &ldquo;{movie.tagline}&rdquo;
              </motion.p>
            )}

            {/* Meta row */}
            <motion.div {...fade} transition={{ delay: 0.3 }} className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className={`font-bold text-base ${ratingColor(movie.voteAverage)}`}>{movie.voteAverage.toFixed(1)}</span>
                <span className="text-slate-500">/ 10 ({movie.voteCount.toLocaleString()} votes)</span>
              </div>
              {movie.runtime > 0 && (
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="w-4 h-4" />{formatRuntime(movie.runtime)}
                </div>
              )}
              <div className="flex items-center gap-1.5 text-slate-400">
                <Calendar className="w-4 h-4" />{movie.releaseDate}
              </div>
              {movie.director !== "Unknown" && (
                <div className="flex items-center gap-1.5 text-slate-400">
                  <User className="w-4 h-4" />{movie.director}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── BODY ──────────────────────────────────────────────── */}
      <div className="px-6 lg:px-10 mt-8 space-y-8">
        {/* Overview + Box Office */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div {...fade} transition={{ delay: 0.35 }} className="lg:col-span-2 rounded-2xl bg-slate-900/80 border border-white/5 p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Film className="w-4 h-4 text-cyan-400" /> Overview
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">{movie.overview}</p>
            <RatingComponent />
          </motion.div>

          <motion.div {...fade} transition={{ delay: 0.4 }} className="rounded-2xl bg-slate-900/80 border border-white/5 p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" /> Box Office
            </h2>
            <div className="space-y-2">
              {[
                { label: "Budget", value: formatMoney(movie.budget), color: "text-cyan-400" },
                { label: "Revenue", value: formatMoney(movie.revenue), color: "text-emerald-400" },
                { label: "ROI", value: movie.budget > 0 ? `${((movie.revenue / movie.budget) * 100).toFixed(0)}%` : "—", color: "text-violet-400" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-xs text-slate-500">{item.label}</span>
                  <span className={`text-sm font-bold ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
            {movie.criticScore > 0 && (
              <div className="pt-2 border-t border-white/5 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-slate-400">Critic Score</span>
                <span className="ml-auto font-bold text-amber-400">{movie.criticScore}/100</span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Cast */}
        {movie.cast.length > 0 && (
          <motion.div {...fade} transition={{ delay: 0.45 }} className="rounded-2xl bg-slate-900/80 border border-white/5 p-6">
            <h2 className="text-base font-bold text-white mb-5 flex items-center gap-2">
              <User className="w-4 h-4 text-violet-400" /> Cast
            </h2>
            <div className="flex gap-5 overflow-x-auto no-scrollbar pb-1">
              {movie.cast.map((member) => (
                <div key={member.id} className="flex flex-col items-center text-center gap-2 flex-shrink-0 w-20">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden bg-slate-800 border border-white/10 flex-shrink-0">
                    {member.profilePath ? (
                      <Image src={member.profilePath} alt={member.name} fill className="object-cover" sizes="56px" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <User className="w-6 h-6 text-slate-600" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-200 leading-tight">{member.name}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{member.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Trailer */}
        {trailer && (
          <motion.div {...fade} transition={{ delay: 0.5 }} className="rounded-2xl bg-slate-900/80 border border-white/5 p-6">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <PlayCircle className="w-4 h-4 text-rose-400" /> Trailer
            </h2>
            <div className="relative rounded-xl overflow-hidden aspect-video max-w-2xl bg-slate-950">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?rel=0&modestbranding=1`}
                title={`${movie.title} — Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </motion.div>
        )}

        {/* Similar Movies */}
        {similar.length > 0 && (
          <motion.div {...fade} transition={{ delay: 0.55 }} className="rounded-2xl bg-slate-900/80 border border-white/5 p-6">
            <h2 className="text-base font-bold text-white mb-5 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" /> Similar Movies
            </h2>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {similar.map((s) => (
                <Link key={s.id} href={`/movie/${s.id}`} className="flex-shrink-0 w-28 group">
                  <div className="relative h-40 rounded-xl overflow-hidden bg-slate-800 border border-white/5 group-hover:border-cyan-500/30 transition-all">
                    {s.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${s.poster_path}`}
                        alt={s.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="112px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-black text-white/20">{s.title[0]}</span>
                      </div>
                    )}
                    <div className="absolute top-1.5 right-1.5 bg-black/70 rounded px-1.5 py-0.5 flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                      <span className="text-[10px] font-bold text-white">{s.vote_average.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 group-hover:text-cyan-300 transition-colors leading-tight">{s.title}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
