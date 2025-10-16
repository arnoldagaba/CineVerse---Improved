import { Link } from "@tanstack/react-router";
import { RatingWidget } from "@/components/actions/rating-widget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPosterUrl } from "@/config/tmdb";
import type { MovieDetail } from "@/types/tmdb";

type MovieDetailSidebarProps = {
    movie: MovieDetail;
};

export function MovieDetailSidebar({ movie }: MovieDetailSidebarProps) {
    const posterUrl = getPosterUrl(movie.poster_path, "w342");

    return (
        <div className="space-y-4">
            {/* Poster */}
            <Card className="overflow-hidden">
                <img
                    alt={movie.title}
                    className="h-auto w-full"
                    loading="lazy"
                    src={posterUrl}
                />
            </Card>

            {/* Rating Widget */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Your Rating</CardTitle>
                </CardHeader>
                <CardContent>
                    <RatingWidget id={movie.id} />
                </CardContent>
            </Card>

            {/* External Links */}
            {movie.imdb_id && (
                <Card>
                    <CardContent className="pt-6">
                        <a
                            className="block font-medium text-primary text-sm hover:underline"
                            href={`https://www.imdb.com/title/${movie.imdb_id}`}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            View on IMDb →
                        </a>
                    </CardContent>
                </Card>
            )}

            {/* Homepage */}
            {movie.homepage && (
                <Card>
                    <CardContent className="pt-6">
                        <a
                            className="block font-medium text-primary text-sm hover:underline"
                            href={movie.homepage}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Official Website →
                        </a>
                    </CardContent>
                </Card>
            )}

            {/* Collection */}
            {movie.belongs_to_collection && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Collection</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Link
                            className="font-medium text-primary text-sm hover:underline"
                            to={`/collection/${movie.belongs_to_collection.id}`}
                        >
                            {movie.belongs_to_collection.name}
                        </Link>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
