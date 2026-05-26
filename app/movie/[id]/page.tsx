import { MOVIES } from "@/lib/mockData";
import { fetchTMDBMovie, tmdbToMovie } from "@/lib/tmdb";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import MovieDetailClient from "@/components/movies/MovieDetailClient";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const numId = Number(params.id);
  const mockMovie = MOVIES.find((m) => m.id === numId);
  const title = mockMovie?.title ?? `Movie #${params.id}`;
  return {
    title: `${title} — CineScope`,
    description: mockMovie?.overview ?? "Movie details on CineScope.",
  };
}

export default async function MoviePage({ params }: Props) {
  const numId = Number(params.id);

  // 1️⃣ Try TMDB first (if API key is set)
  const tmdbRaw = await fetchTMDBMovie(numId);

  let movie = tmdbRaw ? tmdbToMovie(tmdbRaw) : MOVIES.find((m) => m.id === numId);

  // 2️⃣ Fall back to mock data
  if (!movie) {
    movie = MOVIES.find((m) => m.id === numId);
  }

  if (!movie) {
    notFound();
  }

  return <MovieDetailClient movie={movie} tmdb={tmdbRaw} />;
}
