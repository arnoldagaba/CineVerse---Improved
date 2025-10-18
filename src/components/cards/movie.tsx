import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { movieQueryOptions, tvQueryOptions } from "@/api/queries";
import { WatchlistButton } from "@/components/actions/watchlist-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getPosterUrl } from "@/config/tmdb";
import type { Movie, TVShow } from "@/types/tmdb";
import { prefetchMovieRelated, prefetchTVRelated } from "@/utils/cache-utils";

type MovieCardProps = {
    movie: Movie | TVShow;
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
        // Prefetch details and related data based on media type
        if ("title" in movie) {
            queryClient.prefetchQuery(movieQueryOptions.detail(movie.id));
            prefetchMovieRelated(queryClient, movie.id);
        } else {
            queryClient.prefetchQuery(tvQueryOptions.detail(movie.id));
            prefetchTVRelated(queryClient, movie.id);
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        // Don't navigate if clicking on watchlist button
        if (target.closest("[data-watchlist-button]")) {
            e.preventDefault();
            return;
        }
        if ("title" in movie) {
            navigate({
                to: "/movie/$movieId",
                params: { movieId: movie.id },
                search: { tab: "overview" },
            });
        } else {
            navigate({
                to: "/tv/$tvId",
                params: { tvId: movie.id },
                search: { tab: "overview" },
            });
        }
    };

    const displayTitle = "title" in movie ? movie.title : movie.name;
    const displayYear = (() => {
        const dateString =
            "release_date" in movie ? movie.release_date : movie.first_air_date;
        if (!dateString) {
            return "";
        }
        const year = new Date(dateString).getFullYear();
        return Number.isNaN(year) ? "" : String(year);
    })();

    return "title" in movie ? (
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
                        alt={displayTitle}
                        className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-64 md:h-72"
                        loading="lazy"
                        src={posterUrl}
                    />

                    {movie.vote_average > 0 && (
                        <Badge
                            className="absolute top-2 right-2 z-20 bg-primary/90 text-white"
                            variant="secondary"
                        >
                            ⭐ {movie.vote_average.toFixed(1)}
                        </Badge>
                    )}

                    <div className="absolute inset-0 z-10 flex items-end bg-gradient-to-t from-black/80 via-transparent p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
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
                    <div className="space-y-1">
                        <h3 className="line-clamp-2 font-semibold text-sm transition-colors group-hover:text-primary">
                            {displayTitle}
                        </h3>

                        <div className="flex items-center justify-between">
                            {displayYear && (
                                <p className="text-muted-foreground text-xs">
                                    {displayYear}
                                </p>
                            )}
                            {movie.vote_average > 0 && (
                                <p className="text-muted-foreground text-xs">
                                    ⭐ {movie.vote_average.toFixed(1)}
                                </p>
                            )}
                        </div>

                        {"overview" in movie && movie.overview && (
                            <p className="line-clamp-2 text-muted-foreground text-xs">
                                {movie.overview}
                            </p>
                        )}
                    </div>
                </CardHeader>
            </Card>
        </Link>
    ) : (
        <Link
            params={{ tvId: movie.id }}
            search={{ tab: "overview" }}
            to={"/tv/$tvId"}
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
                        alt={displayTitle}
                        className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-64 md:h-72"
                        loading="lazy"
                        src={posterUrl}
                    />

                    {movie.vote_average > 0 && (
                        <Badge
                            className="absolute top-2 right-2 z-20 bg-primary/90 text-white"
                            variant="secondary"
                        >
                            ⭐ {movie.vote_average.toFixed(1)}
                        </Badge>
                    )}

                    <div className="absolute inset-0 z-10 flex items-end bg-gradient-to-t from-black/80 via-transparent p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <WatchlistButton
                            className="gap-2 text-white hover:bg-white/20"
                            data-watchlist-button
                            id={movie.id}
                            onClick={(e) => e.stopPropagation()}
                            size="sm"
                            type="tv"
                            variant="ghost"
                        >
                            Add
                        </WatchlistButton>
                    </div>
                </CardContent>

                <CardHeader className="flex flex-1 flex-col justify-between p-3">
                    <div className="space-y-1">
                        <h3 className="line-clamp-2 font-semibold text-sm transition-colors group-hover:text-primary">
                            {displayTitle}
                        </h3>

                        <div className="flex items-center justify-between">
                            {displayYear && (
                                <p className="text-muted-foreground text-xs">
                                    {displayYear}
                                </p>
                            )}
                            {movie.vote_average > 0 && (
                                <p className="text-muted-foreground text-xs">
                                    ⭐ {movie.vote_average.toFixed(1)}
                                </p>
                            )}
                        </div>

                        {"overview" in movie && movie.overview && (
                            <p className="line-clamp-2 text-muted-foreground text-xs">
                                {movie.overview}
                            </p>
                        )}
                    </div>
                </CardHeader>
            </Card>
        </Link>
    );
}
