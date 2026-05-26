// ─────────────────────────────────────────────
//  Movie Discovery App — Unified Type Definitions
// ─────────────────────────────────────────────

// ── Movie Entity ─────────────────────────────
export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logoPath: string | null;
  originCountry: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profilePath: string | null;
  popularity: number;
  order: number;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  releaseYear: number;
  voteAverage: number;
  voteCount: number;
  popularity: number;
  genres: Genre[];
  runtime: number; // minutes
  budget: number;
  revenue: number;
  language: string;
  status: "Released" | "Post Production" | "In Production" | "Planned";
  tagline: string;
  cast: Cast[];
  director: string;
  criticScore: number; // 0–100 Metacritic-style
  posterColor: string; // dominant CSS color for gradient fallback
}

// ── Filter State ──────────────────────────────
export interface FilterState {
  yearRange: [number, number];
  ratingRange: [number, number];
  genres: number[];
  languages: string[];
  sortBy: SortOption;
}

export type SortOption =
  | "popularity"
  | "rating"
  | "releaseDate"
  | "revenue"
  | "title";

// ── Language ──────────────────────────────────
export interface Language {
  code: string;
  label: string;
}

// ── Chart Data Shapes ─────────────────────────
export interface BoxOfficeTrendPoint {
  year: number;
  domestic: number; // USD millions
  international: number; // USD millions
  total: number; // USD millions
}

export interface RatingsComparisonPoint {
  genre: string;
  userRating: number; // 0–10
  criticScore: number; // 0–10 (normalized from 0–100)
  voteCount: number;
}

export interface GenreMarketSharePoint {
  genre: string;
  share: number; // percentage
  color: string;
}

export interface StatCardData {
  label: string;
  value: string;
  subValue: string;
  trend: "up" | "down" | "neutral";
  trendValue: string;
  icon: string; // Lucide icon name (string, resolved in component)
}

// ── UI State ──────────────────────────────────
export type NavItem = {
  label: string;
  href: string;
  icon: string;
};
