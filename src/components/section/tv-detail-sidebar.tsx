import { RatingWidget } from "@/components/actions/rating-widget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPosterUrl } from "@/config/tmdb";
import type { TVShowDetail } from "@/types/tmdb";

type TVDetailSidebarProps = {
    show: TVShowDetail;
};

export function TVDetailSidebar({ show }: TVDetailSidebarProps) {
    const posterUrl = getPosterUrl(show.poster_path, "w342");

    return (
        <div className="space-y-4">
            <Card className="overflow-hidden">
                <img
                    alt={show.name}
                    className="h-auto w-full"
                    loading="lazy"
                    src={posterUrl}
                />
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Your Rating</CardTitle>
                </CardHeader>
                <CardContent>
                    <RatingWidget id={show.id} />
                </CardContent>
            </Card>

            {show.homepage && (
                <Card>
                    <CardContent className="pt-6">
                        <a
                            className="block font-medium text-primary text-sm hover:underline"
                            href={show.homepage}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Official Website →
                        </a>
                    </CardContent>
                </Card>
            )}

            {show.created_by.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Created By</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-1">
                            {show.created_by.map((creator) => (
                                <li className="text-sm" key={creator.id}>
                                    {creator.name}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
