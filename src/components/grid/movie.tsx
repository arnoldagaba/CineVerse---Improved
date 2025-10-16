/** biome-ignore-all lint/style/noMagicNumbers: <- Just ignore the lint error -> */
import { MovieCard } from "@/components/cards/movie";
import type { Movie } from "@/types/tmdb";

type MovieGridProps = {
    movies: Movie[];
    columns?: {
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
    };
};

export function MovieGrid({
    movies,
    columns = { sm: 2, md: 3, lg: 4, xl: 6 },
}: MovieGridProps) {
    const gridClass = `grid gap-4 grid-cols-${columns.sm || 2} md:grid-cols-${columns.md || 3} lg:grid-cols-${columns.lg || 4} xl:grid-cols-${columns.xl || 6}`;

    return (
        <div className={`${gridClass}`}>
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}
