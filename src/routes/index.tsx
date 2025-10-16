import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import {
    genreQueryOptions,
    movieQueryOptions,
    trendingQueryOptions,
} from "@/api/queries";
import { MovieCardSkeleton } from "@/components/skeletons/movie-card";
import { HomePage } from "@/pages/home";

export const Route = createFileRoute("/")({
    component: RouteComponent,
    loader: async ({ context: { queryClient } }) => {
        // Prefetch all data needed for home page
        await Promise.all([
            queryClient.ensureQueryData(trendingQueryOptions.movies("day")),
            queryClient.ensureQueryData(trendingQueryOptions.tv("day")),
            queryClient.ensureQueryData(movieQueryOptions.popular()),
            queryClient.ensureQueryData(movieQueryOptions.topRated()),
            queryClient.ensureQueryData(genreQueryOptions.movieList()),
        ]);
    },

    head: () => ({
        meta: [
            {
                title: "Cineverse - Discover Movies & TV Shows",
            },
            {
                name: "description",
                content:
                    "Explore trending movies, TV shows, and personalized recommendations. Your ultimate entertainment discovery platform.",
            },
            {
                property: "og:title",
                content: "Cineverse - Discover Movies & TV Shows",
            },
            {
                property: "og:description",
                content:
                    "Explore trending movies, TV shows, and personalized recommendations.",
            },
            {
                name: "theme-color",
                content: "#000000",
            },
        ],
    }),
});

function RouteComponent() {
    return (
        <Suspense fallback={<HomePageSkeleton />}>
            <HomePage />
        </Suspense>
    );
}

function HomePageSkeleton() {
    return (
        <div className="space-y-12 py-8">
            <div className="h-96 animate-pulse rounded-lg bg-gradient-to-b from-primary/20 to-background" />
            <div className="space-y-4">
                <div className="h-8 w-48 animate-pulse rounded bg-muted" />
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: <- Just ignore the lint error ->
                        <MovieCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}
