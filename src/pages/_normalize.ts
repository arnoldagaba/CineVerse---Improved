import type { SearchResult } from "@/types/tmdb";

// Normalize a SearchResult into a Movie-like or TV-like shape suitable for cards
export const normalizeResult = (result: SearchResult) => {
    const movie = () =>
        ({
            id: result.id,
            title: result.title ?? "Untitled",
            original_title: result.title ?? "Untitled",
            overview: result.overview ?? "",
            poster_path: result.poster_path ?? null,
            backdrop_path: result.backdrop_path ?? null,
            release_date: result.release_date ?? "",
            vote_average: result.vote_average ?? 0,
            vote_count: 0,
            popularity: result.popularity ?? 0,
            genre_ids: [] as number[],
            adult: false,
            video: false,
            original_language: "",
        }) as const;

    const tv = () =>
        ({
            id: result.id,
            name: result.name ?? "Untitled",
            original_name: result.name ?? "Untitled",
            overview: result.overview ?? "",
            poster_path: result.poster_path ?? null,
            backdrop_path: result.backdrop_path ?? null,
            first_air_date: result.first_air_date ?? "",
            vote_average: result.vote_average ?? 0,
            vote_count: 0,
            popularity: result.popularity ?? 0,
            genre_ids: [] as number[],
            origin_country: [] as string[],
            original_language: "",
        }) as const;

    const person = () =>
        ({
            id: result.id,
            name: result.name ?? "Unknown",
            original_name: result.name ?? "Unknown",
            overview: result.known_for?.[0]?.overview ?? "",
            poster_path: result.profile_path ?? null,
            backdrop_path: null,
            first_air_date: "",
            vote_average: 0,
            vote_count: 0,
            popularity: result.popularity ?? 0,
            genre_ids: [] as number[],
            origin_country: [] as string[],
            original_language: "",
        }) as const;

    switch (result.media_type) {
        case "movie":
            return movie();
        case "tv":
            return tv();
        default:
            return person();
    }
};
