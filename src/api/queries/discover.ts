/** biome-ignore-all lint/style/noMagicNumbers: <- Ignore lint error -> */
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import type {
    DiscoverFilters,
    Movie,
    PaginatedResponse,
    TVShow,
} from "@/types/tmdb";
import { tmdbClient } from "../client";

export const discoverQueryOptions = {
    // Discover movies
    movies: (filters: DiscoverFilters = {}) =>
        queryOptions({
            queryKey: ["discover", "movies", filters] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<PaginatedResponse<Movie>>(
                    "/discover/movie",
                    {
                        params: filters,
                    }
                );
                return data;
            },
            staleTime: 1000 * 60 * 5,
        }),

    // Discover TV shows
    tv: (filters: DiscoverFilters = {}) =>
        queryOptions({
            queryKey: ["discover", "tv", filters] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<
                    PaginatedResponse<TVShow>
                >("/discover/tv", {
                    params: filters,
                });
                return data;
            },
            staleTime: 1000 * 60 * 5,
        }),

    // Combined discover (based on type filter)
    discover: (filters: DiscoverFilters = {}) => {
        const { type = "movie", ...rest } = filters;
        return type === "movie"
            ? discoverQueryOptions.movies(rest)
            : discoverQueryOptions.tv(rest);
    },

    // Infinite scroll for movies
    moviesInfinite: (filters: Omit<DiscoverFilters, "page"> = {}) =>
        infiniteQueryOptions({
            queryKey: ["discover", "movies", "infinite", filters] as const,
            queryFn: async ({ pageParam = 1 }) => {
                const { data } = await tmdbClient.get<PaginatedResponse<Movie>>(
                    "/discover/movie",
                    {
                        params: { ...filters, page: pageParam },
                    }
                );
                return data;
            },
            getNextPageParam,
            getPreviousPageParam,
            initialPageParam: 1,
            staleTime: 1000 * 60 * 5,
        }),

    // Infinite scroll for TV shows
    tvInfinite: (filters: Omit<DiscoverFilters, "page"> = {}) =>
        infiniteQueryOptions({
            queryKey: ["discover", "tv", "infinite", filters] as const,
            queryFn: async ({ pageParam = 1 }) => {
                const { data } = await tmdbClient.get<
                    PaginatedResponse<TVShow>
                >("/discover/tv", {
                    params: { ...filters, page: pageParam },
                });
                return data;
            },
            getNextPageParam,
            getPreviousPageParam,
            initialPageParam: 1,
            staleTime: 1000 * 60 * 5,
        }),
};
