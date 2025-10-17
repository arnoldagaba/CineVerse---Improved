import { MovieCarousel } from "@/components/carousel/movie";
import type { Movie, TVShow } from "@/types/tmdb";

type RecommendationsSectionProps = {
    movies: Array<Movie | TVShow>;
};

export function RecommendationsSection({
    movies,
}: RecommendationsSectionProps) {
    if (movies.length === 0) {
        return null;
    }

    return (
        <div>
            <h3 className="mb-4 font-bold text-2xl">Recommended For You</h3>
            <MovieCarousel movies={movies as Movie[]} showControls={true} />
        </div>
    );
}
