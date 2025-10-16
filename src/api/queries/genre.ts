/** biome-ignore-all lint/style/noMagicNumbers: <- Ignore the lint error -> */
import { queryOptions } from "@tanstack/react-query";
import type { Genre } from "@/types/tmdb";
import { tmdbClient } from "../client";

export const genreQueryOptions = {
    // Get movie genres
    movieList: () =>
        queryOptions({
            queryKey: ["genres", "movie"] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<{ genres: Genre[] }>(
                    "/genre/movie/list"
                );
                return data;
            },
            staleTime: 1000 * 60 * 60 * 24, // 24 hours (genres rarely change)
        }),

    // Get TV genres
    tvList: () =>
        queryOptions({
            queryKey: ["genres", "tv"] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<{ genres: Genre[] }>(
                    "/genre/tv/list"
                );
                return data;
            },
            staleTime: 1000 * 60 * 60 * 24,
        }),

    // Get all genres (combined)
    all: () =>
        queryOptions({
            queryKey: ["genres", "all"] as const,
            queryFn: async () => {
                const [movieGenres, tvGenres] = await Promise.all([
                    tmdbClient.get<{ genres: Genre[] }>("/genre/movie/list"),
                    tmdbClient.get<{ genres: Genre[] }>("/genre/tv/list"),
                ]);

                // Combine and deduplicate by id
                const allGenres = [
                    ...movieGenres.data.genres,
                    ...tvGenres.data.genres,
                ];
                const uniqueGenres = Array.from(
                    new Map(allGenres.map((g) => [g.id, g])).values()
                );

                return { genres: uniqueGenres };
            },
            staleTime: 1000 * 60 * 60 * 24,
        }),
};
