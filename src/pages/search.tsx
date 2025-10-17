/** biome-ignore-all lint/style/noMagicNumbers: <- Ignore the lint error -> */
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { type SearchResult, searchQueryOptions } from "@/api/queries";
import { MovieCard } from "@/components/cards/movie";
import { Button } from "@/components/ui/button";

export function SearchPage() {
    const { q } = useSearch({ from: "/search" });

    const query = useSuspenseInfiniteQuery(searchQueryOptions.multiInfinite(q));

    const results = query.data.pages.flatMap((p) => p.results);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-6 font-bold text-2xl">Search: “{q}”</h1>
            {results.length === 0 ? (
                <p className="text-muted-foreground">No results found.</p>
            ) : (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                    {results.map((r: SearchResult) => (
                        <MovieCard
                            key={`${r.media_type}-${r.id}`}
                            movie={normalizeResult(r)}
                        />
                    ))}
                </div>
            )}

            {query.hasNextPage && (
                <div className="mt-6 flex justify-center">
                    <Button
                        onClick={() => query.fetchNextPage()}
                        variant="outline"
                    >
                        Load More
                    </Button>
                </div>
            )}
        </div>
    );
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: branching required by API union
function normalizeResult(result: SearchResult) {
    if (result.media_type === "movie") {
        return {
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
        } as const;
    }

    if (result.media_type === "tv") {
        return {
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
        } as const;
    }

    // For persons, return a minimal TVShow-like shape to leverage card layout
    return {
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
    } as const;
}
