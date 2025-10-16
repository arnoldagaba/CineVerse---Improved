import { MovieCarousel } from "@/components/carousel/movie";
import type { Movie } from "@/types/tmdb";

type SimilarMoviesSectionProps = {
    movies: Movie[];
};

export function SimilarMoviesSection({ movies }: SimilarMoviesSectionProps) {
    if (movies.length === 0) {
        return null;
    }

    return (
        <div>
            <h3 className="mb-4 font-bold text-2xl">Similar Movies</h3>
            <MovieCarousel movies={movies} showControls={true} />
        </div>
    );
}
