/** biome-ignore-all lint/style/noMagicNumbers: <- Ignore the lint error -> */
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { type SearchResult, searchQueryOptions } from "@/api/queries";
import { MovieCard } from "@/components/cards/movie";
import { Button } from "@/components/ui/button";
import { normalizeResult } from "./_normalize";

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
