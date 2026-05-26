import { MOVIES } from "@/lib/mockData";
import MovieDetailPanel from "@/components/movies/MovieDetailPanel";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return MOVIES.map((m) => ({ id: String(m.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const movie = MOVIES.find((m) => m.id === Number(params.id));
  if (!movie) return { title: "Movie Not Found" };
  return {
    title: `${movie.title} — CineScope`,
    description: movie.overview,
  };
}

export default function MoviePage({ params }: Props) {
  const movie = MOVIES.find((m) => m.id === Number(params.id));
  if (!movie) notFound();

  return <MovieDetailPanel movie={movie} />;
}
