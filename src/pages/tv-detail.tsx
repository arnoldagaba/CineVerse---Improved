/** biome-ignore-all lint/style/noMagicNumbers: <- Just ignore the lint error -> */

import { useSuspenseQuery } from "@tanstack/react-query";
import { useMatch, useSearch } from "@tanstack/react-router";
import { tvQueryOptions } from "@/api/queries";
import { CastSection } from "@/components/section/cast";
import { CreditsSection } from "@/components/section/credits";
import { RecommendationsSection } from "@/components/section/recommendations";
import { SeasonsSection } from "@/components/section/seasons";
import { SimilarMoviesSection } from "@/components/section/similar-movies";
import { TVDetailHero } from "@/components/section/tv-detail-hero";
import { TVDetailInfo } from "@/components/section/tv-detail-info";
import { TVDetailSidebar } from "@/components/section/tv-detail-sidebar";
import { VideosSection } from "@/components/section/videos";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TVDetailPage() {
    const match = useMatch({ from: "/tv/$tvId" });
    const tvId = match.params.tvId;

    const search = useSearch({ from: "/tv/$tvId" });

    const { data: show } = useSuspenseQuery(tvQueryOptions.detail(tvId));
    const { data: credits } = useSuspenseQuery(tvQueryOptions.credits(tvId));
    const { data: videos } = useSuspenseQuery(tvQueryOptions.videos(tvId));
    const { data: similar } = useSuspenseQuery(tvQueryOptions.similar(tvId));
    const { data: recommendations } = useSuspenseQuery(
        tvQueryOptions.recommendations(tvId)
    );

    const trailer = videos.results.find((v) => v.type === "Trailer");

    return (
        <div className="space-y-8">
            <TVDetailHero show={show} trailer={trailer} />

            <div className="container mx-auto px-4 pb-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="space-y-8 lg:col-span-2">
                        <TVDetailInfo show={show} />

                        <Tabs
                            className="w-full"
                            defaultValue={search.tab || "overview"}
                        >
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="overview">
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger value="cast">
                                    Cast & Crew
                                </TabsTrigger>
                                <TabsTrigger value="seasons">
                                    Seasons
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent className="space-y-8" value="overview">
                                <CastSection cast={credits.cast.slice(0, 10)} />
                                {videos.results.length > 0 && (
                                    <VideosSection videos={videos.results} />
                                )}
                                {similar.results.length > 0 && (
                                    <SimilarMoviesSection
                                        movies={similar.results.slice(0, 6)}
                                    />
                                )}
                                {recommendations.results.length > 0 && (
                                    <RecommendationsSection
                                        movies={recommendations.results.slice(
                                            0,
                                            6
                                        )}
                                    />
                                )}
                            </TabsContent>

                            <TabsContent className="space-y-8" value="cast">
                                <CastSection cast={credits.cast} fullList />
                                <CreditsSection crew={credits.crew} />
                            </TabsContent>

                            <TabsContent value="seasons">
                                <SeasonsSection show={show} />
                            </TabsContent>
                        </Tabs>
                    </div>

                    <aside className="lg:col-span-1">
                        <TVDetailSidebar show={show} />
                    </aside>
                </div>
            </div>
        </div>
    );
}
