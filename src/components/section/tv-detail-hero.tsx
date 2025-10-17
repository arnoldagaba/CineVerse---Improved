import { Play, Share2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { WatchlistButton } from "@/components/actions/watchlist-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBackdropUrl } from "@/config/tmdb";
import { useVideoModal } from "@/hooks/use-video-modal";
import type { TVShowDetail, Video } from "@/types/tmdb";

type TVDetailHeroProps = {
    show: TVShowDetail;
    trailer?: Video;
};

export function TVDetailHero({ show, trailer }: TVDetailHeroProps) {
    const { openModal } = useVideoModal();
    const backdropUrl = getBackdropUrl(show.backdrop_path);
    const year = new Date(show.first_air_date).getFullYear();

    const handleShare = () => {
        const url = `${window.location.origin}/tv/${show.id}`;
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
    };

    return (
        <div className="relative h-96 overflow-hidden sm:h-[500px]">
            <div
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url('${backdropUrl}')` }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div>

            <div className="container relative z-10 mx-auto flex h-full items-end px-4 pb-8">
                <div className="max-w-2xl space-y-4">
                    <div>
                        <h1 className="mb-2 font-bold text-4xl tracking-tight sm:text-5xl">
                            {show.name}
                        </h1>
                        {show.tagline && (
                            <p className="text-lg text-muted-foreground italic">
                                {show.tagline}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Badge className="bg-primary/80 text-white">
                            ⭐ {show.vote_average.toFixed(1)}/10
                        </Badge>
                        <Badge variant="outline">{year}</Badge>
                        <Badge variant="outline">
                            {show.number_of_seasons}{" "}
                            {show.number_of_seasons === 1
                                ? "Season"
                                : "Seasons"}
                        </Badge>
                        <Badge variant="outline">{show.status}</Badge>
                    </div>

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
                            id={show.id}
                            size="lg"
                            type="tv"
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
