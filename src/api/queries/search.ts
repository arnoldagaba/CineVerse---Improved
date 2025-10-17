/** biome-ignore-all lint/style/noMagicNumbers: <- Ignore the lint error -> */
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import type {
    Movie,
    PaginatedResponse,
    Person,
    SearchResult,
    TVShow,
} from "@/types/tmdb";
import { getNextPageParam, getPreviousPageParam } from "@/utils/cache-utils";
import { tmdbClient } from "../client";
import { placeholderInfinite, STALE, safeArray } from "./_utils";

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
            staleTime: STALE.short,
            enabled: query.length >= 2,
            select: (d) => ({ ...d, results: safeArray(d.results) }),
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
            staleTime: STALE.short,
            enabled: query.length >= 2,
            select: (d) => ({ ...d, results: safeArray(d.results) }),
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
            staleTime: STALE.short,
            enabled: query.length >= 2,
            select: (d) => ({ ...d, results: safeArray(d.results) }),
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
            staleTime: STALE.short,
            enabled: query.length >= 2,
            select: (d) => ({ ...d, results: safeArray(d.results) }),
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
            staleTime: STALE.short,
            select: (d) => ({
                ...d,
                pages: d.pages.map((p) => ({
                    ...p,
                    results: safeArray(p.results),
                })),
            }),
            placeholderData: placeholderInfinite<
                PaginatedResponse<SearchResult>
            >({
                page: 1,
                results: [],
                total_pages: 1,
                total_results: 0,
            }),
        }),
};
