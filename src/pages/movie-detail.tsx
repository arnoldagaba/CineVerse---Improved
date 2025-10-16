/** biome-ignore-all lint/style/noMagicNumbers: <- Just ignore the lint error -> */

import { useSuspenseQuery } from "@tanstack/react-query";
import { useMatch, useSearch } from "@tanstack/react-router";
import { movieQueryOptions } from "@/api/queries";
import { CastSection } from "@/components/section/cast";
import { CreditsSection } from "@/components/section/credits";
import { ImagesSection } from "@/components/section/images";
import { MovieDetailHero } from "@/components/section/movie-detail-hero";
import { MovieDetailInfo } from "@/components/section/movie-detail-info";
import { MovieDetailSidebar } from "@/components/section/movie-detail-sidebar";
import { RecommendationsSection } from "@/components/section/recommendations";
import { ReviewsSection } from "@/components/section/reviews";
import { SimilarMoviesSection } from "@/components/section/similar-movies";
import { VideosSection } from "@/components/section/videos";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function MovieDetailPage() {
    const match = useMatch({ from: "/movie/$movieId" });
    const movieId = match.params.movieId;

    const search = useSearch({ from: "/movie/$movieId" });
    const activeTab = search.tab || "overview";

    const { data: movie } = useSuspenseQuery(movieQueryOptions.detail(movieId));
    const { data: credits } = useSuspenseQuery(
        movieQueryOptions.credits(movieId)
    );
    const { data: videos } = useSuspenseQuery(
        movieQueryOptions.videos(movieId)
    );
    const { data: images } = useSuspenseQuery(
        movieQueryOptions.images(movieId)
    );
    const { data: similar } = useSuspenseQuery(
        movieQueryOptions.similar(movieId)
    );
    const { data: recommendations } = useSuspenseQuery(
        movieQueryOptions.recommendations(movieId)
    );
    const { data: reviews } = useSuspenseQuery(
        movieQueryOptions.reviews(movieId)
    );

    const trailer = videos.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
    );

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <MovieDetailHero movie={movie} trailer={trailer} />

            {/* Main Content */}
            <div className="container mx-auto px-4 pb-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left Column - Info & Images */}
                    <div className="space-y-8 lg:col-span-2">
                        {/* Movie Info */}
                        <MovieDetailInfo movie={movie} />

                        {/* Tabs */}
                        <Tabs className="w-full" defaultValue={activeTab}>
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="overview">
                                    Overview
                                </TabsTrigger>

                                <TabsTrigger value="cast">
                                    Cast & Crew
                                </TabsTrigger>

                                <TabsTrigger value="media">Media</TabsTrigger>

                                <TabsTrigger value="reviews">
                                    Reviews
                                </TabsTrigger>
                            </TabsList>

                            {/* Overview Tab */}
                            <TabsContent className="space-y-8" value="overview">
                                {/* Cast Section */}
                                <CastSection cast={credits.cast.slice(0, 10)} />

                                {/* Videos Section */}
                                {videos.results.length > 0 && (
                                    <VideosSection videos={videos.results} />
                                )}

                                {/* Similar Movies */}
                                {similar.results.length > 0 && (
                                    <SimilarMoviesSection
                                        movies={similar.results.slice(0, 6)}
                                    />
                                )}

                                {/* Recommendations */}
                                {recommendations.results.length > 0 && (
                                    <RecommendationsSection
                                        movies={recommendations.results.slice(
                                            0,
                                            6
                                        )}
                                    />
                                )}
                            </TabsContent>

                            {/* Cast & Crew Tab */}
                            <TabsContent className="space-y-8" value="cast">
                                <CastSection cast={credits.cast} fullList />
                                <CreditsSection crew={credits.crew} />
                            </TabsContent>

                            {/* Media Tab */}
                            <TabsContent className="space-y-8" value="media">
                                <VideosSection videos={videos.results} />
                                {images.posters.length > 0 && (
                                    <ImagesSection
                                        images={images.posters}
                                        title="Posters"
                                    />
                                )}
                                {images.backdrops.length > 0 && (
                                    <ImagesSection
                                        images={images.backdrops}
                                        title="Backdrops"
                                    />
                                )}
                            </TabsContent>

                            {/* Reviews Tab */}
                            <TabsContent value="reviews">
                                <ReviewsSection
                                    movieId={movieId}
                                    reviews={reviews.results}
                                />
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Right Column - Sidebar */}
                    <aside className="lg:col-span-1">
                        <MovieDetailSidebar movie={movie} />
                    </aside>
                </div>
            </div>
        </div>
    );
}
