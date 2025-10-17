/** biome-ignore-all lint/style/noMagicNumbers: <- Just ignore the lint error -> */
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import type {
    Credits,
    Images,
    Movie,
    MovieDetail,
    PaginatedResponse,
    Review,
    Videos,
} from "@/types/tmdb";
import { getNextPageParam, getPreviousPageParam } from "@/utils/cache-utils";
import { tmdbClient } from "../client";
import { placeholderInfinite, STALE, safeArray } from "./_utils";

export const movieQueryOptions = {
    // Get movie details
    detail: (movieId: number) =>
        queryOptions({
            queryKey: ["movie", movieId] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<MovieDetail>(
                    `/movie/${movieId}`
                );
                return data;
            },
            staleTime: STALE.short,
        }),

    // Get movie credits (cast & crew)
    credits: (movieId: number) =>
        queryOptions({
            queryKey: ["movie", movieId, "credits"] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<Credits>(
                    `/movie/${movieId}/credits`
                );
                return data;
            },
            staleTime: STALE.medium,
            select: (d) => ({
                ...d,
                cast: safeArray(d.cast),
                crew: safeArray(d.crew),
            }),
        }),

    // Get movie videos
    videos: (movieId: number) =>
        queryOptions({
            queryKey: ["movie", movieId, "videos"] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<Videos>(
                    `/movie/${movieId}/videos`
                );
                return data;
            },
            staleTime: STALE.long,
            select: (d) => ({ ...d, results: safeArray(d.results) }),
        }),

    // Get movie images
    images: (movieId: number) =>
        queryOptions({
            queryKey: ["movie", movieId, "images"] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<Images>(
                    `/movie/${movieId}/images`
                );
                return data;
            },
            staleTime: STALE.long,
            select: (d) => ({
                ...d,
                backdrops: safeArray(d.backdrops),
                posters: safeArray(d.posters),
                logos: safeArray(d.logos),
            }),
        }),

    // Get similar movies
    similar: (movieId: number, page = 1) =>
        queryOptions({
            queryKey: ["movie", movieId, "similar", page] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<PaginatedResponse<Movie>>(
                    `/movie/${movieId}/similar`,
                    { params: { page } }
                );
                return data;
            },
            staleTime: STALE.short,
            select: (d) => ({ ...d, results: safeArray(d.results) }),
        }),

    // Get movie recommendations
    recommendations: (movieId: number, page = 1) =>
        queryOptions({
            queryKey: ["movie", movieId, "recommendations", page] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<PaginatedResponse<Movie>>(
                    `/movie/${movieId}/recommendations`,
                    { params: { page } }
                );
                return data;
            },
            staleTime: STALE.short,
            select: (d) => ({ ...d, results: safeArray(d.results) }),
        }),

    // Get movie reviews
    reviews: (movieId: number, page = 1) =>
        queryOptions({
            queryKey: ["movie", movieId, "reviews", page] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<
                    PaginatedResponse<Review>
                >(`/movie/${movieId}/reviews`, { params: { page } });
                return data;
            },
            staleTime: STALE.short,
            select: (d) => ({ ...d, results: safeArray(d.results) }),
        }),

    // Get popular movies
    popular: (page = 1) =>
        queryOptions({
            queryKey: ["movies", "popular", page] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<PaginatedResponse<Movie>>(
                    "/movie/popular",
                    {
                        params: { page },
                    }
                );
                return data;
            },
            staleTime: STALE.short,
            select: (d) => ({ ...d, results: safeArray(d.results) }),
        }),

    // Infinite scroll version of popular movies
    popularInfinite: () =>
        infiniteQueryOptions({
            queryKey: ["movies", "popular", "infinite"] as const,
            queryFn: async ({ pageParam = 1 }) => {
                const { data } = await tmdbClient.get<PaginatedResponse<Movie>>(
                    "/movie/popular",
                    {
                        params: { page: pageParam },
                    }
                );
                return data;
            },
            getNextPageParam,
            getPreviousPageParam,
            initialPageParam: 1,
            staleTime: STALE.short,
            select: (d) => ({
                ...d,
                pages: d.pages.map((p) => ({
                    ...p,
                    results: safeArray(p.results),
                })),
            }),
            placeholderData: placeholderInfinite<PaginatedResponse<Movie>>({
                page: 1,
                results: [],
                total_pages: 1,
                total_results: 0,
            }),
        }),

    // Get top rated movies
    topRated: (page = 1) =>
        queryOptions({
            queryKey: ["movies", "top-rated", page] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<PaginatedResponse<Movie>>(
                    "/movie/top_rated",
                    {
                        params: { page },
                    }
                );
                return data;
            },
            staleTime: STALE.medium,
            select: (d) => ({ ...d, results: safeArray(d.results) }),
        }),

    // Get now playing movies
    nowPlaying: (page = 1) =>
        queryOptions({
            queryKey: ["movies", "now-playing", page] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<PaginatedResponse<Movie>>(
                    "/movie/now_playing",
                    {
                        params: { page },
                    }
                );
                return data;
            },
            staleTime: STALE.short,
            select: (d) => ({ ...d, results: safeArray(d.results) }),
        }),

    // Get upcoming movies
    upcoming: (page = 1) =>
        queryOptions({
            queryKey: ["movies", "upcoming", page] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<PaginatedResponse<Movie>>(
                    "/movie/upcoming",
                    {
                        params: { page },
                    }
                );
                return data;
            },
            staleTime: STALE.short,
            select: (d) => ({ ...d, results: safeArray(d.results) }),
        }),

    // Get movies by collection
    collection: (collectionId: number) =>
        queryOptions({
            queryKey: ["collection", collectionId] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get(
                    `/collection/${collectionId}`
                );
                return data;
            },
            staleTime: STALE.long,
        }),
};
