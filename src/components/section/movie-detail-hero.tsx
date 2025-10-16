import { Play, Share2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { WatchlistButton } from "@/components/actions/watchlist-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBackdropUrl } from "@/config/tmdb";
import { useVideoModal } from "@/hooks/use-video-modal";
import type { MovieDetail, Video } from "@/types/tmdb";

type MovieDetailHeroProps = {
    movie: MovieDetail;
    trailer?: Video;
};

export function MovieDetailHero({ movie, trailer }: MovieDetailHeroProps) {
    const { openModal } = useVideoModal();
    const backdropUrl = getBackdropUrl(movie.backdrop_path);
    const year = new Date(movie.release_date).getFullYear();

    const handleShare = () => {
        const url = `${window.location.origin}/movie/${movie.id}`;
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
    };

    return (
        <div className="group relative h-96 overflow-hidden sm:h-[500px]">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-center bg-cover bg-no-repeat"
                style={{
                    backgroundImage: `url('${backdropUrl}')`,
                }}
            >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div>

            {/* Content */}
            <div className="container relative z-10 mx-auto flex h-full items-end px-4 pb-8">
                <div className="max-w-2xl space-y-4">
                    {/* Title */}
                    <div>
                        <h1 className="mb-2 font-bold text-4xl tracking-tight sm:text-5xl">
                            {movie.title}
                        </h1>
                        {movie.tagline && (
                            <p className="text-lg text-muted-foreground italic">
                                {movie.tagline}
                            </p>
                        )}
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-3">
                        <Badge className="bg-primary/80 text-white">
                            ⭐ {movie.vote_average.toFixed(1)}/10
                        </Badge>
                        <Badge variant="outline">{year}</Badge>

                        {movie.runtime && (
                            <Badge variant="outline">{movie.runtime} min</Badge>
                        )}
                        {movie.status && (
                            <Badge variant="outline">{movie.status}</Badge>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
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

                        <WatchlistButton
                            className="gap-2"
                            id={movie.id}
                            size="lg"
                            type="movie"
                        >
                            Watchlist
                        </WatchlistButton>

                        <Button
                            className="gap-2"
                            onClick={handleShare}
                            size="lg"
                            variant="outline"
                        >
                            <Share2 className="h-5 w-5" />
                            Share
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
