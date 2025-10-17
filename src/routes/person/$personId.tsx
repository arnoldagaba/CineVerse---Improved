import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { personQueryOptions } from "@/api/queries";
import { MovieDetailSkeleton } from "@/components/skeletons/movie-detail";
import { PersonDetailPage } from "@/pages/person-detail";

export const Route = createFileRoute("/person/$personId")({
    component: RouteComponent,
    parseParams: (params) => ({
        personId: Number(params.personId),
    }),

    loader: async ({ context: { queryClient }, params: { personId } }) => {
        await Promise.all([
            queryClient.ensureQueryData(personQueryOptions.detail(personId)),
            queryClient.ensureQueryData(personQueryOptions.images(personId)),
            queryClient.ensureQueryData(
                personQueryOptions.movieCredits(personId)
            ),
            queryClient.ensureQueryData(personQueryOptions.tvCredits(personId)),
        ]);
    },

    // head: ({ loaderData }) => ({
    //     meta: [
    //         {
    //             title: `${loaderData.name} - Cineverse`,
    //         },
    //         {
    //             name: "description",
    //             content:
    //                 loaderData.biography ||
    //                 `Filmography and details for ${loaderData.name}`,
    //         },
    //     ],
    // }),
});

function RouteComponent() {
    return (
        <Suspense fallback={<MovieDetailSkeleton />}>
            <PersonDetailPage />
        </Suspense>
    );
}
