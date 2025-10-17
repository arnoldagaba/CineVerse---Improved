import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { tvQueryOptions } from "@/api/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPosterUrl } from "@/config/tmdb";
import type { Season, TVShowDetail } from "@/types/tmdb";

type SeasonsSectionProps = {
    show: TVShowDetail;
};

export function SeasonsSection({ show }: SeasonsSectionProps) {
    const [expandedSeasons, setExpandedSeasons] = useState<Set<number>>(
        new Set()
    );

    const toggleSeason = (seasonNumber: number) => {
        const newExpanded = new Set(expandedSeasons);
        if (newExpanded.has(seasonNumber)) {
            newExpanded.delete(seasonNumber);
        } else {
            newExpanded.add(seasonNumber);
        }
        setExpandedSeasons(newExpanded);
    };

    return (
        <div className="space-y-4">
            {show.seasons.map((season) => (
                <SeasonCard
                    isExpanded={expandedSeasons.has(season.season_number)}
                    key={season.id}
                    onToggle={() => toggleSeason(season.season_number)}
                    season={season}
                    tvId={show.id}
                />
            ))}
        </div>
    );
}

function SeasonCard({
    tvId,
    season,
    isExpanded,
    onToggle,
}: {
    tvId: number;
    season: Season;
    isExpanded: boolean;
    onToggle: () => void;
}) {
    const { data: seasonDetail } = useSuspenseQuery(
        tvQueryOptions.season(tvId, season.season_number)
    );

    return (
        <Card>
            <button
                className="w-full text-left"
                onClick={onToggle}
                type="button"
            >
                <CardHeader className="pb-3 transition-colors hover:bg-accent/50">
                    <div className="flex items-start justify-between">
                        <div className="flex flex-1 items-start gap-4">
                            {season.poster_path && (
                                <img
                                    alt={season.name}
                                    className="h-24 w-16 rounded object-cover"
                                    loading="lazy"
                                    src={getPosterUrl(
                                        season.poster_path,
                                        "w185"
                                    )}
                                />
                            )}
                            <div className="flex-1">
                                <CardTitle className="text-lg">
                                    {season.name}
                                </CardTitle>
                                <p className="mt-1 text-muted-foreground text-sm">
                                    {season.episode_count} episodes
                                </p>
                                {season.air_date && (
                                    <p className="text-muted-foreground text-sm">
                                        Aired:{" "}
                                        {new Date(
                                            season.air_date
                                        ).getFullYear()}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            {isExpanded ? (
                                <ChevronUp className="h-5 w-5" />
                            ) : (
                                <ChevronDown className="h-5 w-5" />
                            )}
                        </div>
                    </div>
                </CardHeader>
            </button>

            {isExpanded && (
                <CardContent className="pt-0">
                    {season.overview && (
                        <p className="mb-4 text-muted-foreground text-sm">
                            {season.overview}
                        </p>
                    )}

                    <div className="space-y-3">
                        <h4 className="font-semibold text-sm">Episodes</h4>
                        {seasonDetail.episodes.map((episode) => (
                            <div
                                className="rounded-lg border p-3 transition-colors hover:bg-accent/50"
                                key={episode.id}
                            >
                                <div className="flex gap-3">
                                    {episode.still_path && (
                                        <img
                                            alt={episode.name}
                                            className="h-12 w-20 rounded object-cover"
                                            loading="lazy"
                                            src={`https://image.tmdb.org/t/p/w200${episode.still_path}`}
                                        />
                                    )}
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">
                                            {episode.episode_number}.{" "}
                                            {episode.name}
                                        </p>
                                        <p className="text-muted-foreground text-xs">
                                            {episode.air_date
                                                ? new Date(
                                                      episode.air_date
                                                  ).toLocaleDateString()
                                                : ""}
                                        </p>
                                        <p className="mt-1 text-muted-foreground text-xs">
                                            ⭐ {episode.vote_average.toFixed(1)}{" "}
                                            ({episode.vote_count} votes)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            )}
        </Card>
    );
}
