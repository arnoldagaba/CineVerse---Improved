/** biome-ignore-all lint/style/noMagicNumbers: <- Ignore the lint error -> */
import { queryOptions } from "@tanstack/react-query";
import type {
    Configuration,
    ProductionCountry,
    SpokenLanguage,
} from "@/types/tmdb";
import { tmdbClient } from "../client";

export const configurationQueryOptions = {
    // Get TMDB configuration (image URLs, etc.)
    api: () =>
        queryOptions({
            queryKey: ["configuration"] as const,
            queryFn: async () => {
                const { data } =
                    await tmdbClient.get<Configuration>("/configuration");
                return data;
            },
            staleTime: 1000 * 60 * 60 * 24, // 24 hours
        }),

    // Get list of languages
    languages: () =>
        queryOptions({
            queryKey: ["configuration", "languages"] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<SpokenLanguage[]>(
                    "/configuration/languages"
                );
                return data;
            },
            staleTime: 1000 * 60 * 60 * 24,
        }),

    // Get list of countries
    countries: () =>
        queryOptions({
            queryKey: ["configuration", "countries"] as const,
            queryFn: async () => {
                const { data } = await tmdbClient.get<ProductionCountry[]>(
                    "/configuration/countries"
                );
                return data;
            },
            staleTime: 1000 * 60 * 60 * 24,
        }),
};
