import HeroSection from "@/components/home/HeroSection";
import MovieCarousel from "@/components/home/MovieCarousel";
import { HERO_MOVIE, TRENDING_MOVIES, TOP_RATED_MOVIES, MOVIES } from "@/lib/mockData";

export default function HomePage() {
  const byGenre = MOVIES.filter((m) => m.genres.some((g) => g.name === "Sci-Fi"));

  return (
    <div className="space-y-10 pb-12">
      <HeroSection movie={HERO_MOVIE} />
      <MovieCarousel title="🔥 Trending Now" movies={TRENDING_MOVIES} accentColor="text-cyan-400" />
      <MovieCarousel title="⭐ Top Rated" movies={TOP_RATED_MOVIES} accentColor="text-amber-400" />
      <MovieCarousel title="🚀 Sci-Fi Picks" movies={byGenre} accentColor="text-violet-400" />
    </div>
  );
}
