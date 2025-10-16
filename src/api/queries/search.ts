/** biome-ignore-all lint/style/noMagicNumbers: <- Ignore the lint error -> */
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import type {
    Movie,
    PaginatedResponse,
    Person,
    SearchResult,
    TVShow,
} from "@/types/tmdb";
import { tmdbClient } from "../client";

export const searchQueryOptions = {
    // Multi search (movies, TV shows, people)
    multi: (query: string, page = 1) =>
        queryOptions({
            queryKey: ["search", "multi", query, page] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<
                    PaginatedResponse<SearchResult>
                >("/search/multi", {
                    params: { query, page },
                });
                return data;
            },
            staleTime: 1000 * 60 * 5,
            enabled: query.length >= 2,
        }),

    // Search movies
    movie: (query: string, page = 1) =>
        queryOptions({
            queryKey: ["search", "movie", query, page] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<PaginatedResponse<Movie>>(
                    "/search/movie",
                    {
                        params: { query, page },
                    }
                );
                return data;
            },
            staleTime: 1000 * 60 * 5,
            enabled: query.length >= 2,
        }),

    // Search TV shows
    tv: (query: string, page = 1) =>
        queryOptions({
            queryKey: ["search", "tv", query, page] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<
                    PaginatedResponse<TVShow>
                >("/search/tv", {
                    params: { query, page },
                });
                return data;
            },
            staleTime: 1000 * 60 * 5,
            enabled: query.length >= 2,
        }),

    // Search people
    person: (query: string, page = 1) =>
        queryOptions({
            queryKey: ["search", "person", query, page] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<
                    PaginatedResponse<Person>
                >("/search/person", {
                    params: { query, page },
                });
                return data;
            },
            staleTime: 1000 * 60 * 5,
            enabled: query.length >= 2,
        }),

    // Infinite scroll for multi search
    multiInfinite: (query: string) =>
        infiniteQueryOptions({
            queryKey: ["search", "multi", query, "infinite"] as const,
            queryFn: async ({ pageParam = 1 }) => {
                const { data } = await tmdbClient.get<
                    PaginatedResponse<SearchResult>
                >("/search/multi", {
                    params: { query, page: pageParam },
                });
                return data;
            },
            getNextPageParam,
            getPreviousPageParam,
            initialPageParam: 1,
            enabled: query.length >= 2,
            staleTime: 1000 * 60 * 5,
        }),
};
