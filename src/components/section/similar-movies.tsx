import { MovieCarousel } from "@/components/carousel/movie";
import type { Movie, TVShow } from "@/types/tmdb";

type SimilarMoviesSectionProps = {
    movies: Array<Movie | TVShow>;
};

export function SimilarMoviesSection({ movies }: SimilarMoviesSectionProps) {
    if (movies.length === 0) {
        return null;
    }

    return (
        <div>
            <h3 className="mb-4 font-bold text-2xl">Similar Titles</h3>
            <MovieCarousel movies={movies as Movie[]} showControls={true} />
        </div>
    );
}
