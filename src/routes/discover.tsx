import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { z } from "zod";
import { MovieDetailSkeleton } from "@/components/skeletons/movie-detail";
import { DiscoverPage } from "@/pages/discover";

const discoverSchema = z.object({
    type: z.enum(["movie", "tv"]).optional().default("movie"),
    genre: z.number().optional(),
    year: z.number().optional(),
    "vote_average.gte": z.number().optional(),
    sort_by: z.string().optional().default("popularity.desc"),
    page: z.number().optional().default(1),
});

export const Route = createFileRoute("/discover")({
    component: RouteComponent,
    validateSearch: discoverSchema,

    // head: ({ search }) => ({
    //     meta: [
    //         {
    //             title: `Discover ${search.type === "movie" ? "Movies" : "TV Shows"} - Cineverse`,
    //         },
    //     ],
    // }),
});

function RouteComponent() {
    return (
        <Suspense fallback={<MovieDetailSkeleton />}>
            <DiscoverPage />
        </Suspense>
    );
}
