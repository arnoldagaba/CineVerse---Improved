import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { movieQueryOptions, tvQueryOptions } from "@/api/queries";
import { MovieGrid } from "@/components/grid/movie";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useWatchlistStore } from "@/stores/watchlist";
import type { Movie, TVShow } from "@/types/tmdb";

type FetchedItem = Record<string, unknown> & {
    _type: "movie" | "tv";
    _addedAt: number;
    vote_average?: number;
    title?: string;
    name?: string;
};

export function WatchlistPage() {
    const { items } = useWatchlistStore();
    const [sortBy, setSortBy] = useState<"date" | "title" | "rating">("date");
    const [filterType, setFilterType] = useState<"all" | "movie" | "tv">("all");

    const [watchlistData, setWatchlistData] = useState<FetchedItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchItem = async ({
            id,
            type,
            addedAt,
        }: {
            id: number;
            type: "movie" | "tv";
            addedAt: number;
        }) => {
            try {
                const queryOption =
                    type === "movie"
                        ? movieQueryOptions.detail(id)
                        : tvQueryOptions.detail(id);
                const response = queryOption
                    ? await (
                          queryOption.queryFn as unknown as () => Promise<unknown>
                      )()
                    : null;
                if (!response) {
                    return null;
                }

                return {
                    ...(response as Record<string, unknown>),
                    _type: type,
                    _addedAt: addedAt,
                } as FetchedItem;
            } catch {
                return null;
            }
        };

        const loadData = async () => {
            setIsLoading(true);

            try {
                const promises = items
                    .filter(
                        (item) =>
                            filterType === "all" || item.type === filterType
                    )
                    .map((it) => fetchItem(it));

                const data = await Promise.all(promises);

                const filtered = data.filter((d): d is FetchedItem =>
                    Boolean(d)
                );

                const getTitle = (x: FetchedItem) => {
                    if (!x) {
                        return "";
                    }
                    if (typeof x.title === "string") {
                        return x.title;
                    }
                    if (typeof x.name === "string") {
                        return x.name;
                    }
                    return "";
                };

                const compareByDate = (a: FetchedItem, b: FetchedItem) =>
                    (b._addedAt ?? 0) - (a._addedAt ?? 0);
                const compareByTitle = (a: FetchedItem, b: FetchedItem) =>
                    getTitle(a).localeCompare(getTitle(b));
                const compareByRating = (a: FetchedItem, b: FetchedItem) => {
                    const av =
                        typeof a.vote_average === "number" ? a.vote_average : 0;
                    const bv =
                        typeof b.vote_average === "number" ? b.vote_average : 0;
                    return bv - av;
                };

                let sorted: FetchedItem[];
                if (sortBy === "date") {
                    sorted = filtered.sort(compareByDate);
                } else if (sortBy === "title") {
                    sorted = filtered.sort(compareByTitle);
                } else if (sortBy === "rating") {
                    sorted = filtered.sort(compareByRating);
                } else {
                    sorted = filtered;
                }

                setWatchlistData(sorted);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [items, sortBy, filterType]);

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="mx-auto max-w-md space-y-4 text-center">
                    <h1 className="font-bold text-3xl">
                        Your Watchlist is Empty
                    </h1>
                    <p className="text-muted-foreground">
                        Start adding movies and TV shows to your watchlist!
                    </p>
                    <Button asChild>
                        <Link to="/discover">Discover Content</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="mb-4 font-bold text-4xl">My Watchlist</h1>
                <p className="text-muted-foreground">
                    {items.length} {items.length === 1 ? "item" : "items"} in
                    your watchlist
                </p>
            </div>

            {/* Controls */}
            <div className="mb-8 flex gap-4">
                <Select
                    onValueChange={(value: "all" | "movie" | "tv") =>
                        setFilterType(value)
                    }
                    value={filterType}
                >
                    <SelectTrigger className="w-40">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Items</SelectItem>
                        <SelectItem value="movie">Movies Only</SelectItem>
                        <SelectItem value="tv">TV Shows Only</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    onValueChange={(value: "date" | "title" | "rating") =>
                        setSortBy(value)
                    }
                    value={sortBy}
                >
                    <SelectTrigger className="w-40">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="date">Date Added</SelectItem>
                        <SelectItem value="title">Title (A-Z)</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Content */}
            {isLoading ? (
                <div className="py-12 text-center">
                    <p className="text-muted-foreground">
                        Loading your watchlist...
                    </p>
                </div>
                // biome-ignore lint/style/noNestedTernary: <- Just ignore the lint error ->
            ) : watchlistData.length > 0 ? (
                <MovieGrid
                    movies={watchlistData as unknown as (Movie | TVShow)[]}
                />
            ) : (
                <Card>
                    <CardContent className="pt-6 text-center">
                        <p className="text-muted-foreground">
                            No {filterType === "all" ? "items" : filterType} in
                            your watchlist
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
