/** biome-ignore-all lint/style/noMagicNumbers: <- Ignore the lint error -> */
import { queryOptions } from "@tanstack/react-query";
import type { Genre } from "@/types/tmdb";
import { tmdbClient } from "../client";
import { STALE, safeArray } from "./_utils";

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
            staleTime: STALE.day, // 24 hours (genres rarely change)
            select: (d) => ({ genres: safeArray(d.genres) }),
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
            staleTime: STALE.day,
            select: (d) => ({ genres: safeArray(d.genres) }),
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
                    ...safeArray(movieGenres.data.genres),
                    ...safeArray(tvGenres.data.genres),
                ];
                const uniqueGenres = Array.from(
                    new Map(allGenres.map((g) => [g.id, g])).values()
                );

                return { genres: uniqueGenres };
            },
            staleTime: STALE.day,
        }),
};
