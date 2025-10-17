/** biome-ignore-all lint/style/noMagicNumbers: <- Ignore the lint error -> */
import { queryOptions } from "@tanstack/react-query";
import type {
    Movie,
    PaginatedResponse,
    Person,
    SearchResult,
    TVShow,
} from "@/types/tmdb";
import { tmdbClient } from "../client";
import { STALE, safeArray } from "./_utils";

export type TimeWindow = "day" | "week";
export type MediaType = "all" | "movie" | "tv" | "person";

export const trendingQueryOptions = {
    // Get trending items
    trending: (mediaType: MediaType, timeWindow: TimeWindow, page = 1) =>
        queryOptions({
            queryKey: ["trending", mediaType, timeWindow, page] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<
                    PaginatedResponse<SearchResult>
                >(`/trending/${mediaType}/${timeWindow}`, { params: { page } });
                return data;
            },
            staleTime: STALE.short,
            select: (d) => ({ ...d, results: safeArray(d.results) }),
        }),

    // Trending movies
    movies: (timeWindow: TimeWindow, page = 1) =>
        queryOptions({
            queryKey: ["trending", "movie", timeWindow, page] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<PaginatedResponse<Movie>>(
                    `/trending/movie/${timeWindow}`,
                    { params: { page } }
                );
                return data;
            },
            staleTime: STALE.short,
            select: (d) => ({ ...d, results: safeArray(d.results) }),
        }),

    // Trending TV shows
    tv: (timeWindow: TimeWindow, page = 1) =>
        queryOptions({
            queryKey: ["trending", "tv", timeWindow, page] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<
                    PaginatedResponse<TVShow>
                >(`/trending/tv/${timeWindow}`, { params: { page } });
                return data;
            },
            staleTime: STALE.short,
            select: (d) => ({ ...d, results: safeArray(d.results) }),
        }),

    // Trending people
    people: (timeWindow: TimeWindow, page = 1) =>
        queryOptions({
            queryKey: ["trending", "person", timeWindow, page] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<
                    PaginatedResponse<Person>
                >(`/trending/person/${timeWindow}`, { params: { page } });
                return data;
            },
            staleTime: STALE.medium,
            select: (d) => ({ ...d, results: safeArray(d.results) }),
        }),

    // All trending content (movies, TV, people)
    all: (timeWindow: TimeWindow, page = 1) =>
        queryOptions({
            queryKey: ["trending", "all", timeWindow, page] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<
                    PaginatedResponse<SearchResult>
                >(`/trending/all/${timeWindow}`, { params: { page } });
                return data;
            },
            staleTime: STALE.short,
            select: (d) => ({ ...d, results: safeArray(d.results) }),
        }),
};
