import type { QueryClient } from "@tanstack/react-query";
import {
    movieQueryOptions,
    personQueryOptions,
    queryKeys,
    tvQueryOptions,
} from "@/api/queries";

/**
 * Prefetch related content for a movie
 */
export async function prefetchMovieRelated(
    queryClient: QueryClient,
    movieId: number
): Promise<void> {
    await Promise.allSettled([
        queryClient.prefetchQuery(movieQueryOptions.credits(movieId)),
        queryClient.prefetchQuery(movieQueryOptions.similar(movieId)),
        queryClient.prefetchQuery(movieQueryOptions.recommendations(movieId)),
        queryClient.prefetchQuery(movieQueryOptions.videos(movieId)),
    ]);
}

/**
 * Prefetch related content for a TV show
 */
export async function prefetchTVRelated(
    queryClient: QueryClient,
    tvId: number
): Promise<void> {
    await Promise.allSettled([
        queryClient.prefetchQuery(tvQueryOptions.credits(tvId)),
        queryClient.prefetchQuery(tvQueryOptions.similar(tvId)),
        queryClient.prefetchQuery(tvQueryOptions.recommendations(tvId)),
        queryClient.prefetchQuery(tvQueryOptions.videos(tvId)),
    ]);
}

/**
 * Prefetch person's credits
 */
export async function prefetchPersonCredits(
    queryClient: QueryClient,
    personId: number
): Promise<void> {
    await Promise.allSettled([
        queryClient.prefetchQuery(personQueryOptions.movieCredits(personId)),
        queryClient.prefetchQuery(personQueryOptions.tvCredits(personId)),
    ]);
}

/**
 * Invalidate all movie-related queries
 */
export async function invalidateMovieQueries(
    queryClient: QueryClient,
    movieId?: number
): Promise<void> {
    if (movieId) {
        await queryClient.invalidateQueries({
            queryKey: queryKeys.movie.detail(movieId),
        });
    } else {
        await queryClient.invalidateQueries({
            queryKey: queryKeys.movie.all,
        });
    }
}

/**
 * Clear all cache (useful for logout or data refresh)
 */
export async function clearAllCache(queryClient: QueryClient): Promise<void> {
    await queryClient.clear();
}

/**
 * Get cache statistics
 */
export function getCacheStats(queryClient: QueryClient) {
    const cache = queryClient.getQueryCache();
    const queries = cache.getAll();

    return {
        totalQueries: queries.length,
        activeQueries: queries.filter((q) => q.state.fetchStatus === "fetching")
            .length,
        staleQueries: queries.filter((q) => q.isStale()).length,
        cacheSize: queries.reduce((acc, q) => {
            const dataSize = JSON.stringify(q.state.data).length;
            return acc + dataSize;
        }, 0),
    };
}
