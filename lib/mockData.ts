import type { Genre, BoxOfficeTrendPoint, RatingsComparisonPoint, GenreMarketSharePoint, Language } from "./types";
import { MOVIES_PART1 } from "./moviesPartOne";
import { MOVIES_PART2 } from "./moviesPartTwo";

export const GENRES: Genre[] = [
  { id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" }, { id: 80, name: "Crime" }, { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" }, { id: 14, name: "Fantasy" }, { id: 27, name: "Horror" },
  { id: 9648, name: "Mystery" }, { id: 10402, name: "Music" }, { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" }, { id: 53, name: "Thriller" },
];

export const LANGUAGES: Language[] = [
  { code: "en", label: "English" }, { code: "es", label: "Spanish" },
  { code: "fr", label: "French" }, { code: "ko", label: "Korean" },
  { code: "ja", label: "Japanese" }, { code: "hi", label: "Hindi" },
];

export const MOVIES = [...MOVIES_PART1, ...MOVIES_PART2];

export const HERO_MOVIE = MOVIES[1];
export const TRENDING_MOVIES = [MOVIES[1], MOVIES[2], MOVIES[0], MOVIES[6], MOVIES[8], MOVIES[10], MOVIES[14], MOVIES[23]];
export const TOP_RATED_MOVIES = [MOVIES[11], MOVIES[4], MOVIES[5], MOVIES[7], MOVIES[3], MOVIES[2], MOVIES[17], MOVIES[21]];

export const BOX_OFFICE_TRENDS: BoxOfficeTrendPoint[] = [
  { year: 2014, domestic: 4800, international: 6200, total: 11000 },
  { year: 2015, domestic: 5200, international: 7100, total: 12300 },
  { year: 2016, domestic: 5100, international: 7400, total: 12500 },
  { year: 2017, domestic: 5500, international: 8000, total: 13500 },
  { year: 2018, domestic: 5900, international: 8400, total: 14300 },
  { year: 2019, domestic: 6100, international: 9200, total: 15300 },
  { year: 2020, domestic: 1100, international: 1300, total: 2400 },
  { year: 2021, domestic: 2900, international: 3800, total: 6700 },
  { year: 2022, domestic: 5700, international: 7600, total: 13300 },
  { year: 2023, domestic: 6400, international: 9100, total: 15500 },
  { year: 2024, domestic: 6800, international: 9700, total: 16500 },
];

export const RATINGS_COMPARISON: RatingsComparisonPoint[] = [
  { genre: "Action", userRating: 7.2, criticScore: 6.4, voteCount: 45000 },
  { genre: "Drama", userRating: 8.1, criticScore: 8.6, voteCount: 32000 },
  { genre: "Comedy", userRating: 6.8, criticScore: 6.2, voteCount: 28000 },
  { genre: "Sci-Fi", userRating: 7.9, criticScore: 7.5, voteCount: 38000 },
  { genre: "Horror", userRating: 6.5, criticScore: 6.8, voteCount: 22000 },
  { genre: "Thriller", userRating: 7.7, criticScore: 7.9, voteCount: 30000 },
  { genre: "Animation", userRating: 8.3, criticScore: 8.7, voteCount: 18000 },
];

export const GENRE_MARKET_SHARE: GenreMarketSharePoint[] = [
  { genre: "Action", share: 28, color: "#06b6d4" },
  { genre: "Adventure", share: 18, color: "#8b5cf6" },
  { genre: "Drama", share: 16, color: "#f59e0b" },
  { genre: "Animation", share: 12, color: "#10b981" },
  { genre: "Sci-Fi", share: 10, color: "#3b82f6" },
  { genre: "Horror", share: 8, color: "#ef4444" },
  { genre: "Other", share: 8, color: "#6b7280" },
];
