/** biome-ignore-all lint/style/noMagicNumbers: <--- Just ignore the lint error --> */

import { useSuspenseQuery } from "@tanstack/react-query";
import { useMatch, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { discoverQueryOptions, genreQueryOptions } from "@/api/queries";
import { DiscoverFilters } from "@/components/discover/filters";
import { MovieGrid } from "@/components/grid/movie";
import { Button } from "@/components/ui/button";
import { getPaginationRange } from "@/utils/pagination";
import { MOVIE_SORT_OPTIONS, TV_SORT_OPTIONS } from "@/utils/sort-options";

export function DiscoverPage() {
    const search = useMatch({ from: "/search" }).search;
    const navigate = useNavigate();

    const { data } = useSuspenseQuery(discoverQueryOptions.discover(search));
    const { data: genresData } = useSuspenseQuery(
        genreQueryOptions.movieList()
    );

    const pages = getPaginationRange(search.page, data.total_pages);

    const handlePageChange = (page: number) => {
        navigate({
            search: { ...search, page },
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleFilterChange = (newFilters: Partial<typeof search>) => {
        navigate({
            search: { ...search, ...newFilters, page: 1 },
        });
    };

    const sortOptions =
        search.type === "movie" ? MOVIE_SORT_OPTIONS : TV_SORT_OPTIONS;

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
                            Showing {(search.page - 1) * 20 + 1}-
                            {Math.min(search.page * 20, data.total_results)} of{" "}
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
                                        disabled={search.page === 1}
                                        onClick={() =>
                                            handlePageChange(
                                                Math.max(1, search.page - 1)
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
                                                key={`ellipsis-${i}`}
                                            >
                                                ...
                                            </span>
                                        ) : (
                                            <Button
                                                key={page}
                                                onClick={() =>
                                                    handlePageChange(
                                                        Number(page)
                                                    )
                                                }
                                                variant={
                                                    search.page === page
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
                                            search.page === data.total_pages
                                        }
                                        onClick={() =>
                                            handlePageChange(
                                                Math.min(
                                                    data.total_pages,
                                                    search.page + 1
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
