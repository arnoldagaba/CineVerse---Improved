import type { DiscoverFilters } from "@/types/tmdb";

/**
 * Build discover filters from URL params
 */
export function buildDiscoverFilters(
    searchParams: Record<string, unknown>
): DiscoverFilters {
    const filters: DiscoverFilters = {};

    if (searchParams.genre) {
        filters.with_genres = String(searchParams.genre);
    }

    if (searchParams.year) {
        const year = Number(searchParams.year);
        filters["release_date.gte"] = `${year}-01-01`;
        filters["release_date.lte"] = `${year}-12-31`;
    }

    if (searchParams.rating) {
        filters["vote_average.gte"] = Number(searchParams.rating);
    }

    if (searchParams.sort) {
        filters.sort_by = String(searchParams.sort);
    }

    if (searchParams.page) {
        filters.page = Number(searchParams.page);
    }

    return filters;
}

/**
 * Convert filters to URL search params
 */
export function filtersToSearchParams(
    filters: DiscoverFilters
): Record<string, string> {
    const params: Record<string, string> = {};

    for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null) {
            params[key] = String(value);
        }
    }

    return params;
}

/**
 * Get active filter count
 */
export function getActiveFilterCount(filters: DiscoverFilters): number {
    const ignoreKeys = ["page", "sort_by", "type"];

    return Object.entries(filters).filter(
        ([key, value]) => value !== undefined && !ignoreKeys.includes(key)
    ).length;
}

/**
 * Clear all filters
 */
export function clearFilters(filters: DiscoverFilters): DiscoverFilters {
    return {
        type: filters.type,
        sort_by: filters.sort_by,
        page: 1,
    };
}

/**
 * Remove a specific filter
 */
export function removeFilter(
    filters: DiscoverFilters,
    key: keyof DiscoverFilters
): DiscoverFilters {
    const newFilters = { ...filters };
    delete newFilters[key];
    return { ...newFilters, page: 1 };
}