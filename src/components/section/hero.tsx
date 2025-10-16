import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { movieQueryOptions } from "@/api/queries";
import { WatchlistButton } from "@/components/actions/watchlist-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBackdropUrl } from "@/config/tmdb";
import { useVideoModal } from "@/hooks/use-video-modal";
import type { Movie } from "@/types/tmdb";

type HeroSectionProps = {
    movie: Movie;
};

export function HeroSection({ movie }: HeroSectionProps) {
    const { data: movieDetail } = useSuspenseQuery(
        movieQueryOptions.detail(movie.id)
    );
    const { data: videos } = useSuspenseQuery(
        movieQueryOptions.videos(movie.id)
    );
    const { openModal } = useVideoModal();

    const trailer = videos.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
    );

    const backdropUrl = getBackdropUrl(movie.backdrop_path);
    const year = new Date(movie.release_date).getFullYear();

    return (
        <div className="relative overflow-hidden rounded-lg">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-center bg-cover"
                style={{
                    backgroundImage: `url('${backdropUrl}')`,
                }}
            >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div>

            {/* Content */}
            <div className="container relative z-10 mx-auto px-4 py-16">
                <div className="max-w-2xl space-y-6">
                    {/* Title & Info */}
                    <div className="space-y-2">
                        <h1 className="font-bold text-5xl tracking-tight">
                            {movie.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-3">
                            <Badge
                                className="bg-primary/80 text-white"
                                variant="secondary"
                            >
                                ⭐ {movie.vote_average.toFixed(1)}/10
                            </Badge>
                            <Badge variant="outline">{year}</Badge>
                            {movieDetail.runtime && (
                                <Badge variant="outline">
                                    {movieDetail.runtime} min
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* Genres */}
                    {movieDetail.genres.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {/** biome-ignore lint/style/noMagicNumbers: <- Just ignore the lint error -> */}
                            {movieDetail.genres.slice(0, 3).map((genre) => (
                                <Link
                                    className="text-primary text-sm hover:underline"
                                    key={genre.id}
                                    search={{ genre: genre.id, type: "movie" }}
                                    to="/discover"
                                >
                                    {genre.name}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Overview */}
                    <p className="line-clamp-3 max-w-xl text-base text-muted-foreground leading-relaxed">
                        {movie.overview}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-2">
                        {trailer && (
                            <Button
                                className="gap-2"
                                onClick={() => openModal(trailer)}
                                size="lg"
                            >
                                <Play className="h-5 w-5" />
                                Watch Trailer
                            </Button>
                        )}

                        <Link to={`/movie/${movie.id}`}>
                            <Button size="lg" variant="outline">
                                View Details
                            </Button>
                        </Link>

                        <WatchlistButton
                            className="gap-2"
                            id={movie.id}
                            size="lg"
                            type="movie"
                            variant="ghost"
                        >
                            <span className="hidden sm:inline">Watchlist</span>
                        </WatchlistButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
