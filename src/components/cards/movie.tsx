import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { movieQueryOptions } from "@/api/queries";
import { WatchlistButton } from "@/components/actions/watchlist-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getPosterUrl } from "@/config/tmdb";
import type { Movie } from "@/types/tmdb";
import { prefetchMovieRelated } from "@/utils/cache-utils";

type MovieCardProps = {
    movie: Movie;
    size?: "sm" | "md" | "lg";
};

export function MovieCard({ movie, size = "md" }: MovieCardProps) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const posterUrl = getPosterUrl(
        movie.poster_path,
        // biome-ignore lint/style/noNestedTernary: <- Just ignore the lint error ->
        size === "sm" ? "w185" : size === "md" ? "w342" : "w500"
    );

    const handleMouseEnter = () => {
        // Prefetch movie details and related data
        queryClient.prefetchQuery(movieQueryOptions.detail(movie.id));
        prefetchMovieRelated(queryClient, movie.id);
    };

    const handleClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        // Don't navigate if clicking on watchlist button
        if (target.closest("[data-watchlist-button]")) {
            e.preventDefault();
            return;
        }
        navigate({
            to: "/movie/$movieId",
            search: { tab: "overview" },
            params: { movieId: movie.id },
        });
    };

    return (
        <Link
            params={{ movieId: movie.id }}
            search={{ tab: "overview" }}
            to={"/movie/$movieId"}
        >
            <Card className="group flex h-full cursor-pointer flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
                <CardContent
                    className="relative flex-1 overflow-hidden bg-muted p-0"
                    onClick={handleClick}
                    onMouseEnter={handleMouseEnter}
                >
                    {/** biome-ignore lint/nursery/useImageSize: <- Just ignore the lint error -> */}
                    {/** biome-ignore lint/performance/noImgElement: <- Just ignore the lint error -> */}
                    <img
                        alt={movie.title}
                        className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110 sm:h-72"
                        loading="lazy"
                        src={posterUrl}
                    />

                    {/* Rating Badge */}
                    {movie.vote_average > 0 && (
                        <Badge
                            className="absolute top-2 right-2 z-20 bg-primary/90 text-white"
                            variant="secondary"
                        >
                            ⭐ {movie.vote_average.toFixed(1)}
                        </Badge>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 z-10 flex items-end bg-gradient-to-t from-black/80 via-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <WatchlistButton
                            className="gap-2 text-white hover:bg-white/20"
                            data-watchlist-button
                            id={movie.id}
                            onClick={(e) => e.stopPropagation()}
                            size="sm"
                            type="movie"
                            variant="ghost"
                        >
                            Add
                        </WatchlistButton>
                    </div>
                </CardContent>

                <CardHeader className="flex flex-1 flex-col justify-between p-3">
                    <div>
                        <h3 className="line-clamp-2 font-semibold text-sm transition-colors group-hover:text-primary">
                            {movie.title}
                        </h3>

                        <p className="mt-1 text-muted-foreground text-xs">
                            {new Date(movie.release_date).getFullYear()}
                        </p>
                    </div>
                </CardHeader>
            </Card>
        </Link>
    );
}
