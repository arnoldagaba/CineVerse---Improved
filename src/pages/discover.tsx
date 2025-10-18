/** biome-ignore-all lint/style/noMagicNumbers: <- Just ignore the lint error -> */

import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { discoverQueryOptions, genreQueryOptions } from "@/api/queries";
import { DiscoverFilters } from "@/components/discover/filters";
import { MovieGrid } from "@/components/grid/movie";
import { Button } from "@/components/ui/button";
import type { DiscoverFilters as DiscoverFiltersType } from "@/types/tmdb";
import { getPaginationRange, usePaginationParams } from "@/utils/pagination";
import { MOVIE_SORT_OPTIONS, TV_SORT_OPTIONS } from "@/utils/sort-options";

export function DiscoverPage() {
    // Use the discover route's validated search params so types match the
    // discoverQueryOptions and the route's schema (includes `page`, `type`, etc.)
    const search = useSearch({ from: "/discover" }) as DiscoverFiltersType;
    const navigate = useNavigate();

    const { data } = useSuspenseQuery(
        discoverQueryOptions.discover(search as DiscoverFiltersType)
    );
    const { data: genresData } = useSuspenseQuery(
        genreQueryOptions.movieList()
    );

    const { currentPage, setPage } = usePaginationParams();
    const pages = getPaginationRange(currentPage, data.total_pages);

    const handleFilterChange = (newFilters: Partial<typeof search>) => {
        const nextSearch = {
            ...(search as unknown as Record<string, unknown>),
            ...(newFilters as unknown as Record<string, unknown>),
            page: 1,
        } as unknown as Record<string, unknown>;

        navigate({ to: "/discover", search: nextSearch });
    };

    // MOVIE_SORT_OPTIONS and TV_SORT_OPTIONS are readonly tuples. The
    // DiscoverFilters component accepts an array of options shaped as
    // { value: string; label: string } — derive that type here without
    // resorting to `any`.
    type SortOption = { value: string; label: string };
    const sortOptions: SortOption[] = (
        search.type === "movie"
            ? (MOVIE_SORT_OPTIONS as unknown)
            : (TV_SORT_OPTIONS as unknown)
    ) as SortOption[];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-8 font-bold text-3xl">
                Discover {search.type === "movie" ? "Movies" : "TV Shows"}
            </h1>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                {/* Sidebar Filters */}
                <aside className="lg:col-span-1">
                    <DiscoverFilters
                        filters={search}
                        genres={genresData.genres}
                        onFilterChange={handleFilterChange}
                        sortOptions={sortOptions}
                    />
                </aside>

                {/* Results */}
                <main className="lg:col-span-3">
                    <div className="mb-6 flex items-center justify-between">
                        <p className="text-muted-foreground">
                            Showing {(currentPage - 1) * 20 + 1}-
                            {Math.min(currentPage * 20, data.total_results)} of{" "}
                            {data.total_results} results
                        </p>
                    </div>

                    {data.results.length > 0 ? (
                        <>
                            <MovieGrid movies={data.results} />

                            {/* Pagination */}
                            {data.total_pages > 1 && (
                                <div className="mt-8 flex justify-center gap-2">
                                    <Button
                                        disabled={currentPage === 1}
                                        onClick={() =>
                                            setPage(
                                                Math.max(1, currentPage - 1)
                                            )
                                        }
                                        size="icon"
                                        variant="outline"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>

                                    {pages.map((page, i) =>
                                        page === "..." ? (
                                            <span
                                                className="px-2 py-1"
                                                key={`ellipsis-${pages[i - 1] ?? "s"}-${pages[i + 1] ?? "e"}`}
                                            >
                                                ...
                                            </span>
                                        ) : (
                                            <Button
                                                key={page}
                                                onClick={() =>
                                                    setPage(Number(page))
                                                }
                                                variant={
                                                    currentPage === page
                                                        ? "default"
                                                        : "outline"
                                                }
                                            >
                                                {page}
                                            </Button>
                                        )
                                    )}

                                    <Button
                                        disabled={
                                            currentPage === data.total_pages
                                        }
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
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="py-12 text-center">
                            <p className="text-muted-foreground">
                                No results found
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
