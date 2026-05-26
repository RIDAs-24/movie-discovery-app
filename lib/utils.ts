import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind class merging utility.
 * Combines clsx + tailwind-merge for conflict-free class composition.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as USD (millions abbreviated).
 */
export function formatMoney(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  }
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(0)}M`;
  }
  return `$${amount.toLocaleString()}`;
}

/**
 * Format runtime in minutes to "Xh Ym".
 */
export function formatRuntime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

/**
 * Return a star count (0–5) from a 0–10 vote average.
 */
export function toStarRating(voteAverage: number): number {
  return Math.round((voteAverage / 10) * 5 * 2) / 2;
}

/**
 * Clamp a value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Return a colour class based on rating score.
 */
export function ratingColor(score: number): string {
  if (score >= 8) return "text-emerald-400";
  if (score >= 6) return "text-cyan-400";
  if (score >= 4) return "text-yellow-400";
  return "text-rose-400";
}
