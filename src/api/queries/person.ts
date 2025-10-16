/** biome-ignore-all lint/style/noMagicNumbers: <- Ignore the lint error -> */
import { queryOptions } from "@tanstack/react-query";
import type {
    Image,
    MovieCredits,
    PaginatedResponse,
    Person,
    PersonDetail,
    TVCredits,
} from "@/types/tmdb";
import { tmdbClient } from "../client";

export const personQueryOptions = {
    // Get person details
    detail: (personId: number) =>
        queryOptions({
            queryKey: ["person", personId] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<PersonDetail>(
                    `/person/${personId}`
                );
                return data;
            },
            staleTime: 1000 * 60 * 10,
        }),

    // Get person movie credits
    movieCredits: (personId: number) =>
        queryOptions({
            queryKey: ["person", personId, "movie-credits"] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<MovieCredits>(
                    `/person/${personId}/movie_credits`
                );
                return data;
            },
            staleTime: 1000 * 60 * 10,
        }),

    // Get person TV credits
    tvCredits: (personId: number) =>
        queryOptions({
            queryKey: ["person", personId, "tv-credits"] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<TVCredits>(
                    `/person/${personId}/tv_credits`
                );
                return data;
            },
            staleTime: 1000 * 60 * 10,
        }),

    // Get combined credits (movies + TV)
    combinedCredits: (personId: number) =>
        queryOptions({
            queryKey: ["person", personId, "combined-credits"] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get(
                    `/person/${personId}/combined_credits`
                );
                return data;
            },
            staleTime: 1000 * 60 * 10,
        }),

    // Get person images
    images: (personId: number) =>
        queryOptions({
            queryKey: ["person", personId, "images"] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<{ profiles: Image[] }>(
                    `/person/${personId}/images`
                );
                return data;
            },
            staleTime: 1000 * 60 * 30,
        }),

    // Get popular people
    popular: (page = 1) =>
        queryOptions({
            queryKey: ["people", "popular", page] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<
                    PaginatedResponse<Person>
                >("/person/popular", {
                    params: { page },
                });
                return data;
            },
            staleTime: 1000 * 60 * 10,
        }),
};
