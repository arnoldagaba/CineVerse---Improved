import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { movieQueryOptions } from "@/api/queries";
import { MovieDetailSkeleton } from "@/components/skeletons/movie-detail";
import { MovieDetailPage } from "@/pages/movie-detail";

export const Route = createFileRoute("/movie/$movieId")({
    component: RouteComponent,
    parseParams: (params) => ({
        movieId: Number(params.movieId),
    }),

    validateSearch: (search: Record<string, unknown>) => ({
        tab: (search.tab as "overview" | "cast" | "similar") || "overview",
    }),

    loader: async ({ context: { queryClient }, params: { movieId } }) => {
        // Prefetch all movie data in parallel
        await Promise.all([
            queryClient.ensureQueryData(movieQueryOptions.detail(movieId)),
            queryClient.ensureQueryData(movieQueryOptions.credits(movieId)),
            queryClient.ensureQueryData(movieQueryOptions.videos(movieId)),
            queryClient.ensureQueryData(movieQueryOptions.images(movieId)),
            queryClient.ensureQueryData(movieQueryOptions.similar(movieId)),
            queryClient.ensureQueryData(
                movieQueryOptions.recommendations(movieId)
            ),
            queryClient.ensureQueryData(movieQueryOptions.reviews(movieId)),
        ]);
    },

    // head: ({ loaderData }) => ({
    //     meta: [
    //         {
    //             title: `${loaderData.title} (${new Date(loaderData.release_date).getFullYear()}) - Cineverse`,
    //         },
    //         {
    //             name: "description",
    //             content: loaderData.overview,
    //         },
    //         {
    //             property: "og:title",
    //             content: loaderData.title,
    //         },
    //         {
    //             property: "og:description",
    //             content: loaderData.overview,
    //         },
    //         {
    //             property: "og:image",
    //             content: `https://image.tmdb.org/t/p/w780${loaderData.backdrop_path}`,
    //         },
    //         {
    //             property: "og:type",
    //             content: "video.movie",
    //         },
    //     ],
    // }),

    errorComponent: ({ error }) => (
        <div className="container mx-auto px-4 py-16">
            <div className="space-y-4 text-center">
                <h1 className="font-bold text-4xl">Movie Not Found</h1>
                <p className="text-muted-foreground">{error.message}</p>
            </div>
        </div>
    ),
});

function RouteComponent() {
    return (
        <Suspense fallback={<MovieDetailSkeleton />}>
            <MovieDetailPage />
        </Suspense>
    );
}
