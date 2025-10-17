/** biome-ignore-all lint/style/noMagicNumbers: <- Just ignore the lint error -> */
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import type {
    Credits,
    Episode,
    Images,
    PaginatedResponse,
    Review,
    SeasonDetail,
    TVShow,
    TVShowDetail,
    Videos,
} from "@/types/tmdb";
import { getNextPageParam, getPreviousPageParam } from "@/utils/cache-utils";
import { tmdbClient } from "../client";
import { placeholderInfinite, STALE, safeArray } from "./_utils";

export const tvQueryOptions = {
    // Get TV show details
    detail: (tvId: number) =>
        queryOptions({
            queryKey: ["tv", tvId] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<TVShowDetail>(
                    `/tv/${tvId}`
                );
                return data;
            },
            staleTime: STALE.short,
        }),

    // Get TV show credits
    credits: (tvId: number) =>
        queryOptions({
            queryKey: ["tv", tvId, "credits"] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<Credits>(
                    `/tv/${tvId}/credits`
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

    // Get TV show videos
    videos: (tvId: number) =>
        queryOptions({
            queryKey: ["tv", tvId, "videos"] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<Videos>(
                    `/tv/${tvId}/videos`
                );
                return data;
            },
            staleTime: STALE.long,
            select: (d) => ({ ...d, results: safeArray(d.results) }),
        }),

    // Get TV show images
    images: (tvId: number) =>
        queryOptions({
            queryKey: ["tv", tvId, "images"] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<Images>(
                    `/tv/${tvId}/images`
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

    // Get similar TV shows
    similar: (tvId: number, page = 1) =>
        queryOptions({
            queryKey: ["tv", tvId, "similar", page] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<
                    PaginatedResponse<TVShow>
                >(`/tv/${tvId}/similar`, { params: { page } });
                return data;
            },
            staleTime: STALE.short,
            select: (d) => ({ ...d, results: safeArray(d.results) }),
        }),

    // Get TV show recommendations
    recommendations: (tvId: number, page = 1) =>
        queryOptions({
            queryKey: ["tv", tvId, "recommendations", page] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<
                    PaginatedResponse<TVShow>
                >(`/tv/${tvId}/recommendations`, { params: { page } });
                return data;
            },
            staleTime: STALE.short,
            select: (d) => ({ ...d, results: safeArray(d.results) }),
        }),

    // Get TV show reviews
    reviews: (tvId: number, page = 1) =>
        queryOptions({
            queryKey: ["tv", tvId, "reviews", page] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<
                    PaginatedResponse<Review>
                >(`/tv/${tvId}/reviews`, { params: { page } });
                return data;
            },
            staleTime: STALE.short,
            select: (d) => ({ ...d, results: safeArray(d.results) }),
        }),

    // Get season details
    season: (tvId: number, seasonNumber: number) =>
        queryOptions({
            queryKey: ["tv", tvId, "season", seasonNumber] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<SeasonDetail>(
                    `/tv/${tvId}/season/${seasonNumber}`
                );
                return data;
            },
            staleTime: STALE.medium,
        }),

    // Get episode details
    episode: (tvId: number, seasonNumber: number, episodeNumber: number) =>
        queryOptions({
            queryKey: [
                "tv",
                tvId,
                "season",
                seasonNumber,
                "episode",
                episodeNumber,
            ] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<Episode>(
                    `/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`
                );
                return data;
            },
            staleTime: STALE.medium,
        }),

    // Get popular TV shows
    popular: (page = 1) =>
        queryOptions({
            queryKey: ["tv", "popular", page] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<
                    PaginatedResponse<TVShow>
                >("/tv/popular", {
                    params: { page },
                });
                return data;
            },
            staleTime: STALE.short,
            select: (d) => ({ ...d, results: safeArray(d.results) }),
        }),

    // Get top rated TV shows
    topRated: (page = 1) =>
        queryOptions({
            queryKey: ["tv", "top-rated", page] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<
                    PaginatedResponse<TVShow>
                >("/tv/top_rated", {
                    params: { page },
                });
                return data;
            },
            staleTime: STALE.medium,
            select: (d) => ({ ...d, results: safeArray(d.results) }),
        }),

    // Get airing today
    airingToday: (page = 1) =>
        queryOptions({
            queryKey: ["tv", "airing-today", page] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<
                    PaginatedResponse<TVShow>
                >("/tv/airing_today", {
                    params: { page },
                });
                return data;
            },
            staleTime: STALE.short,
            select: (d) => ({ ...d, results: safeArray(d.results) }),
        }),

    // Get on the air
    onTheAir: (page = 1) =>
        queryOptions({
            queryKey: ["tv", "on-the-air", page] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<
                    PaginatedResponse<TVShow>
                >("/tv/on_the_air", {
                    params: { page },
                });
                return data;
            },
            staleTime: STALE.short,
            select: (d) => ({ ...d, results: safeArray(d.results) }),
        }),

    // Infinite scroll version
    popularInfinite: () =>
        infiniteQueryOptions({
            queryKey: ["tv", "popular", "infinite"] as const,
            queryFn: async ({ pageParam = 1 }) => {
                const { data } = await tmdbClient.get<
                    PaginatedResponse<TVShow>
                >("/tv/popular", {
                    params: { page: pageParam },
                });
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
            placeholderData: placeholderInfinite<PaginatedResponse<TVShow>>({
                page: 1,
                results: [],
                total_pages: 1,
                total_results: 0,
            }),
        }),
};
