import type { Movie } from "./types";

// ── TMDB API helpers ──────────────────────────────────────────────────────────
const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMG = "https://image.tmdb.org/t/p";

function apiKey(): string | undefined {
  return process.env.TMDB_API_KEY;
}

function headers() {
  const key = apiKey();
  if (!key) return {};
  return { Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
}

export function tmdbPoster(path: string | null, size = "w500"): string | null {
  if (!path) return null;
  return `${TMDB_IMG}/${size}${path}`;
}

export function tmdbBackdrop(path: string | null, size = "original"): string | null {
  if (!path) return null;
  return `${TMDB_IMG}/${size}${path}`;
}

// Raw TMDB movie detail shape (subset we use)
export interface TMDBMovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  runtime: number;
  budget: number;
  revenue: number;
  tagline: string;
  status: string;
  original_language: string;
  genres: { id: number; name: string }[];
  credits?: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
      popularity: number;
      order: number;
    }[];
    crew: { id: number; name: string; job: string }[];
  };
  videos?: {
    results: {
      id: string;
      key: string;
      site: string;
      type: string;
      official: boolean;
    }[];
  };
  similar?: {
    results: {
      id: number;
      title: string;
      poster_path: string | null;
      vote_average: number;
      release_date: string;
      genre_ids: number[];
    }[];
  };
}

export async function fetchTMDBMovie(id: number): Promise<TMDBMovieDetail | null> {
  const key = apiKey();
  if (!key) return null;
  try {
    const res = await fetch(
      `${TMDB_BASE}/movie/${id}?append_to_response=credits,videos,similar`,
      { headers: headers() as HeadersInit, next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// Convert a TMDBMovieDetail to our internal Movie shape
export function tmdbToMovie(t: TMDBMovieDetail): Movie {
  const director = t.credits?.crew.find((c) => c.job === "Director")?.name ?? "Unknown";
  return {
    id: t.id,
    title: t.title,
    overview: t.overview,
    posterPath: tmdbPoster(t.poster_path),
    backdropPath: tmdbBackdrop(t.backdrop_path),
    releaseDate: t.release_date,
    releaseYear: t.release_date ? Number(t.release_date.slice(0, 4)) : 0,
    voteAverage: Math.round(t.vote_average * 10) / 10,
    voteCount: t.vote_count,
    popularity: t.popularity,
    genres: t.genres,
    runtime: t.runtime ?? 0,
    budget: t.budget,
    revenue: t.revenue,
    language: t.original_language,
    status: t.status as Movie["status"],
    tagline: t.tagline ?? "",
    director,
    criticScore: 0,
    posterColor: "#0f172a",
    cast: (t.credits?.cast ?? []).slice(0, 10).map((c) => ({
      id: c.id,
      name: c.name,
      character: c.character,
      profilePath: tmdbPoster(c.profile_path, "w185"),
      popularity: c.popularity,
      order: c.order,
    })),
  };
}
