/** biome-ignore-all lint/style/noMagicNumbers: <- Just ignore the lint error -> */
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
    type MediaType,
    type TimeWindow,
    trendingQueryOptions,
} from "@/api/queries/trending";
import { MovieCard } from "@/components/cards/movie";
import { MovieGrid } from "@/components/grid/movie";
import { Button } from "@/components/ui/button";
import type { SearchResult } from "@/types/tmdb";
import { getPaginationRange, usePaginationParams } from "@/utils/pagination";
import { normalizeResult } from "./_normalize";

type TrendingSearch = {
    type?: MediaType;
    timeWindow?: TimeWindow;
    page?: number;
};

export function TrendingPage() {
    const search = useSearch({ from: "/trending" }) as TrendingSearch;
    const navigate = useNavigate();

    const type = (search.type as MediaType) ?? "all";
    const timeWindow = (search.timeWindow as TimeWindow) ?? "day";
    const page = Number(search.page) || 1;

    // Use the generic 'trending' query which always returns SearchResult items — keeps hook order stable
    const { data } = useSuspenseQuery(
        trendingQueryOptions.trending(type, timeWindow, page)
    );

    const { currentPage, setPage } = usePaginationParams("/trending");
    const pages = getPaginationRange(currentPage, data.total_pages);

    const handleFilterChange = (newFilters: Partial<TrendingSearch>) => {
        const nextSearch = {
            ...(search as unknown as Record<string, unknown>),
            ...(newFilters as unknown as Record<string, unknown>),
            page: 1,
        } as unknown as Record<string, unknown>;

        navigate({ to: "/trending", search: nextSearch });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="font-bold text-3xl">Trending</h1>

                <div className="flex items-center gap-2">
                    <Button
                        onClick={() =>
                            handleFilterChange({ timeWindow: "day" })
                        }
                        size="sm"
                        variant={timeWindow === "day" ? "default" : "outline"}
                    >
                        Today
                    </Button>

                    <Button
                        onClick={() =>
                            handleFilterChange({ timeWindow: "week" })
                        }
                        size="sm"
                        variant={timeWindow === "week" ? "default" : "outline"}
                    >
                        This Week
                    </Button>
                </div>
            </div>

            {data.results.length === 0 ? (
                <div className="py-12 text-center">
                    <p className="text-muted-foreground">No results found</p>
                </div>
            ) : (
                <>
                    {type === "all" ? (
                        // Mixed results: normalize and render as cards
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                            {data.results.map((r: SearchResult) => (
                                <MovieCard
                                    key={`${r.media_type}-${r.id}`}
                                    movie={normalizeResult(r)}
                                />
                            ))}
                        </div>
                    ) : (
                        // Movie/TV queries return a homogeneous list we can pass to MovieGrid
                        <MovieGrid movies={data.results} />
                    )}

                    {/* Pagination */}
                    {data.total_pages > 1 && (
                        <div className="mt-8 flex justify-center gap-2">
                            <Button
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setPage(Math.max(1, currentPage - 1))
                                }
                                size="icon"
                                variant="outline"
                            >
                                ◀
                            </Button>

                            {pages.map((pageItem, i) =>
                                pageItem === "..." ? (
                                    <span
                                        className="px-2 py-1"
                                        key={`ellipsis-${pages[i - 1] ?? "s"}-${pages[i + 1] ?? "e"}`}
                                    >
                                        ...
                                    </span>
                                ) : (
                                    <Button
                                        key={pageItem}
                                        onClick={() =>
                                            setPage(Number(pageItem))
                                        }
                                        variant={
                                            currentPage === pageItem
                                                ? "default"
                                                : "outline"
                                        }
                                    >
                                        {pageItem}
                                    </Button>
                                )
                            )}

                            <Button
                                disabled={currentPage === data.total_pages}
                                onClick={() =>
                                    setPage(
                                        Math.min(
                                            data.total_pages,
                                            currentPage + 1
                                        )
                                    )
                                }
                                size="icon"
                                variant="outline"
                            >
                                ▶
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
