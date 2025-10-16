import { MovieCarousel } from "@/components/carousel/movie";
import type { TVShow } from "@/types/tmdb";

type TVCarouselProps = {
    shows: TVShow[];
};

export function TVCarousel({ shows }: TVCarouselProps) {
    return (
        <MovieCarousel
            movies={shows as any} // TVShow has same structure as Movie
        />
    );
}