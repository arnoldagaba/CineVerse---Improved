export const TMDB_CONFIG = {
    imageBaseUrl:
        import.meta.env.VITE_TMDB_IMAGE_BASE_URL ||
        "https://image.tmdb.org/t/p/",
    posterSizes: {
        w92: "w92",
        w154: "w154",
        w185: "w185",
        w342: "w342",
        w500: "w500",
        w780: "w780",
        original: "original",
    },
    backdropSizes: {
        w300: "w300",
        w780: "w780",
        w1280: "w1280",
        original: "original",
    },
};

export function getPosterUrl(path: string | null, size = "w342"): string {
    if (!path) {
        return "/images/placeholder-poster.jpg";
    }
    return `${TMDB_CONFIG.imageBaseUrl}${size}${path}`;
}

export function getBackdropUrl(path: string | null, size = "w1280"): string {
    if (!path) {
        return "/images/placeholder-backdrop.jpg";
    }
    return `${TMDB_CONFIG.imageBaseUrl}${size}${path}`;
}

export function getProfileUrl(path: string | null, size = "w185"): string {
    if (!path) {
        return "/images/placeholder-profile.jpg";
    }
    return `${TMDB_CONFIG.imageBaseUrl}${size}${path}`;
}
