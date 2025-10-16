import type { DiscoverFilters } from "@/types/tmdb";
import type { MediaType, TimeWindow } from "./trending";

export const queryKeys = {
    // Movie keys
    movie: {
        all: ["movie"] as const,
        details: () => [...queryKeys.movie.all, "detail"] as const,
        detail: (id: number) => [...queryKeys.movie.details(), id] as const,
        credits: (id: number) =>
            [...queryKeys.movie.detail(id), "credits"] as const,
        videos: (id: number) =>
            [...queryKeys.movie.detail(id), "videos"] as const,
        images: (id: number) =>
            [...queryKeys.movie.detail(id), "images"] as const,
        similar: (id: number) =>
            [...queryKeys.movie.detail(id), "similar"] as const,
        recommendations: (id: number) =>
            [...queryKeys.movie.detail(id), "recommendations"] as const,
        reviews: (id: number) =>
            [...queryKeys.movie.detail(id), "reviews"] as const,
    },

    // TV keys
    tv: {
        all: ["tv"] as const,
        details: () => [...queryKeys.tv.all, "detail"] as const,
        detail: (id: number) => [...queryKeys.tv.details(), id] as const,
        season: (id: number, season: number) =>
            [...queryKeys.tv.detail(id), "season", season] as const,
        episode: (id: number, season: number, episode: number) =>
            [...queryKeys.tv.season(id, season), "episode", episode] as const,
    },

    // Person keys
    person: {
        all: ["person"] as const,
        details: () => [...queryKeys.person.all, "detail"] as const,
        detail: (id: number) => [...queryKeys.person.details(), id] as const,
        movieCredits: (id: number) =>
            [...queryKeys.person.detail(id), "movie-credits"] as const,
        tvCredits: (id: number) =>
            [...queryKeys.person.detail(id), "tv-credits"] as const,
    },

    // Search keys
    search: {
        all: ["search"] as const,
        multi: (query: string) =>
            [...queryKeys.search.all, "multi", query] as const,
        movie: (query: string) =>
            [...queryKeys.search.all, "movie", query] as const,
        tv: (query: string) => [...queryKeys.search.all, "tv", query] as const,
        person: (query: string) =>
            [...queryKeys.search.all, "person", query] as const,
    },

    // Discover keys
    discover: {
        all: ["discover"] as const,
        movies: (filters: DiscoverFilters) =>
            [...queryKeys.discover.all, "movies", filters] as const,
        tv: (filters: DiscoverFilters) =>
            [...queryKeys.discover.all, "tv", filters] as const,
    },

    // Trending keys
    trending: {
        all: ["trending"] as const,
        byType: (type: MediaType, timeWindow: TimeWindow) =>
            [...queryKeys.trending.all, type, timeWindow] as const,
    },

    // Genre keys
    genres: {
        all: ["genres"] as const,
        movie: () => [...queryKeys.genres.all, "movie"] as const,
        tv: () => [...queryKeys.genres.all, "tv"] as const,
    },
};