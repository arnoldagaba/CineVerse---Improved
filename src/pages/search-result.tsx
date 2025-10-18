/** biome-ignore-all lint/style/noMagicNumbers: <- Just ignore the lint error -> */
/** biome-ignore-all lint/style/noNestedTernary: <- Just ignore the lint error -> */

import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type Person, searchQueryOptions } from "@/api/queries";
import { MovieGrid } from "@/components/grid/movie";
import { SearchBar } from "@/components/search/search-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPaginationRange } from "@/utils/pagination";

type SearchResultsPageProps = {
    search: {
        q: string;
        type: "all" | "movie" | "tv" | "person";
        page: number;
    };
};

export function SearchResultsPage({ search }: SearchResultsPageProps) {
    const navigate = useNavigate();

    const queryOption =
        search.type === "all"
            ? searchQueryOptions.multi(search.q, search.page)
            : search.type === "movie"
              ? searchQueryOptions.movie(search.q, search.page)
              : search.type === "tv"
                ? searchQueryOptions.tv(search.q, search.page)
                : searchQueryOptions.person(search.q, search.page);

    const { data } = useSuspenseQuery(queryOption);

    const pages = getPaginationRange(search.page, data.total_pages);

    const handlePageChange = (page: number) => {
        navigate({
            search: { ...search, page },
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Search Bar */}
            <div className="mb-8 max-w-2xl">
                <SearchBar />
            </div>

            {/* Results Header */}
            <div className="mb-8">
                <h1 className="mb-2 font-bold text-3xl">Search Results</h1>
                <p className="text-muted-foreground">
                    Showing {search.page * 20 - 19} -{" "}
                    {Math.min(search.page * 20, data.total_results)} of{" "}
                    {data.total_results} results for "{search.q}"
                </p>
            </div>

            {/* Type Tabs */}
            <Tabs
                className="mb-8"
                defaultValue={search.type}
                onValueChange={(type) =>
                    navigate({
                        search: { q: search.q, type: type as any, page: 1 },
                    })
                }
            >
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="movie">Movies</TabsTrigger>
                    <TabsTrigger value="tv">TV Shows</TabsTrigger>
                    <TabsTrigger value="person">People</TabsTrigger>
                </TabsList>

                <TabsContent className="mt-6" value={search.type}>
                    {data.results.length > 0 ? (
                        <>
                            {search.type === "person" ? (
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                    {data.results.map((person: Person) => (
                                        <SearchPersonCard
                                            key={person.id}
                                            person={person}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <MovieGrid movies={data.results} />
                            )}

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
                        <Card>
                            <CardContent className="pt-6 text-center">
                                <p className="mb-4 text-muted-foreground">
                                    No results found for "{search.q}"
                                </p>
                                <Button asChild variant="outline">
                                    <a href="/discover">Browse All Content</a>
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}

function SearchPersonCard({ person }: { person: Person }) {
    const imageUrl = person.profile_path
        ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
        : "/images/placeholder-profile.jpg";

    return (
        <Link className="group" to={`/person/${person.id}`}>
            <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                <CardContent className="p-0">
                    <img
                        alt={person.name}
                        className="h-64 w-full object-cover transition-opacity group-hover:opacity-80"
                        loading="lazy"
                        src={imageUrl}
                    />
                </CardContent>
            </Card>
            <h3 className="mt-2 font-semibold text-sm transition-colors group-hover:text-primary">
                {person.name}
            </h3>
            <p className="text-muted-foreground text-xs">
                {person.known_for_department}
            </p>
        </Link>
    );
}
