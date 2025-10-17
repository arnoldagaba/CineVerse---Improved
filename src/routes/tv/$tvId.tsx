import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { tvQueryOptions } from "@/api/queries";
import { MovieDetailSkeleton } from "@/components/skeletons/movie-detail";
import { TVDetailPage } from "@/pages/tv-detail";

export const Route = createFileRoute("/tv/$tvId")({
    component: RouteComponent,
    parseParams: (params) => ({ tvId: Number(params.tvId) }),
    validateSearch: (search: Record<string, unknown>) => ({
        tab: (search.tab as "overview" | "cast" | "seasons") || "overview",
    }),
    loader: async ({ context: { queryClient }, params: { tvId } }) => {
        await Promise.all([
            queryClient.ensureQueryData(tvQueryOptions.detail(tvId)),
            queryClient.ensureQueryData(tvQueryOptions.credits(tvId)),
            queryClient.ensureQueryData(tvQueryOptions.videos(tvId)),
            queryClient.ensureQueryData(tvQueryOptions.similar(tvId)),
            queryClient.ensureQueryData(tvQueryOptions.recommendations(tvId)),
        ]);
    },

    // head: ({ loaderData }) => ({
    //     meta: [
    //         {
    //             title: `${loaderData.name} - CineVerse`,
    //         },
    //         {
    //             name: "description",
    //             content: loaderData.overview,
    //         },
    //     ],
    // }),
});

function RouteComponent() {
    return (
        <Suspense fallback={<MovieDetailSkeleton />}>
            <TVDetailPage />
        </Suspense>
    );
}
