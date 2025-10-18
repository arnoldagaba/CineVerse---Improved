import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { z } from "zod";
import { trendingQueryOptions } from "@/api/queries";
import { MovieDetailSkeleton } from "@/components/skeletons/movie-detail";
import { TrendingPage } from "@/pages/trending";

const trendingSchema = z.object({
    type: z.enum(["all", "movie", "tv", "person"]).optional().default("all"),
    timeWindow: z.enum(["day", "week"]).optional().default("day"),
    page: z.number().optional().default(1),
});

export const Route = createFileRoute("/trending")({
    component: RouteComponent,
    validateSearch: trendingSchema,
    loader: async ({ context: { queryClient } }) => {
        const defaultWindow = "day" as const;

        // Prefetch the appropriate queries used by the trending page (default to day)
        await Promise.all([
            queryClient.ensureQueryData(
                trendingQueryOptions.all(defaultWindow)
            ),
            queryClient.ensureQueryData(
                trendingQueryOptions.movies(defaultWindow)
            ),
            queryClient.ensureQueryData(trendingQueryOptions.tv(defaultWindow)),
            queryClient.ensureQueryData(
                trendingQueryOptions.people(defaultWindow)
            ),
        ]);
    },
});

function RouteComponent() {
    return (
        <Suspense fallback={<MovieDetailSkeleton />}>
            <TrendingPage />
        </Suspense>
    );
}
