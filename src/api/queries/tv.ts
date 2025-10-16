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
import { tmdbClient } from "../client";

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
            staleTime: 1000 * 60 * 5,
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
            staleTime: 1000 * 60 * 10,
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
            staleTime: 1000 * 60 * 30,
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
            staleTime: 1000 * 60 * 30,
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
            staleTime: 1000 * 60 * 5,
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
            staleTime: 1000 * 60 * 5,
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
            staleTime: 1000 * 60 * 5,
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
            staleTime: 1000 * 60 * 10,
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
            staleTime: 1000 * 60 * 10,
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
            staleTime: 1000 * 60 * 5,
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
            staleTime: 1000 * 60 * 10,
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
            staleTime: 1000 * 60 * 5,
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
            staleTime: 1000 * 60 * 5,
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
            staleTime: 1000 * 60 * 5,
        }),
};
