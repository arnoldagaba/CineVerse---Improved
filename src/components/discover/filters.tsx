/** biome-ignore-all lint/suspicious/noExplicitAny: <- Just ignore the lint error -> */
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import type { Genre } from "@/types/tmdb";

type DiscoverFiltersProps = {
    filters: any;
    genres: Genre[];
    sortOptions: any[];
    onFilterChange: (filters: any) => void;
};

export function DiscoverFilters({
    filters,
    genres,
    sortOptions,
    onFilterChange,
}: DiscoverFiltersProps) {
    const hasActiveFilters =
        filters.genre || filters.year || filters["vote_average.gte"];

    return (
        <div className="sticky top-20 space-y-4">
            {/* Active Filters */}
            {hasActiveFilters && (
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center justify-between text-sm">
                            Active Filters
                            <Button
                                className="h-auto p-0"
                                onClick={() =>
                                    onFilterChange({
                                        type: filters.type,
                                        sort_by: filters.sort_by,
                                    })
                                }
                                size="sm"
                                variant="ghost"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        {filters.genre && (
                            <Badge
                                className="flex items-center gap-1"
                                variant="secondary"
                            >
                                {
                                    genres.find((g) => g.id === filters.genre)
                                        ?.name
                                }
                                <button
                                    className="ml-1"
                                    onClick={() =>
                                        onFilterChange({
                                            ...filters,
                                            genre: undefined,
                                        })
                                    }
                                    type="button"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        )}
                        {filters.year && (
                            <Badge
                                className="flex items-center gap-1"
                                variant="secondary"
                            >
                                {filters.year}
                                <button
                                    className="ml-1"
                                    onClick={() =>
                                        onFilterChange({
                                            ...filters,
                                            year: undefined,
                                        })
                                    }
                                    type="button"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        )}
                        {filters["vote_average.gte"] && (
                            <Badge
                                className="flex items-center gap-1"
                                variant="secondary"
                            >
                                Rating ≥ {filters["vote_average.gte"]}
                                <button
                                    className="ml-1"
                                    onClick={() =>
                                        onFilterChange({
                                            ...filters,
                                            "vote_average.gte": undefined,
                                        })
                                    }
                                    type="button"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Sort */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">Sort By</CardTitle>
                </CardHeader>
                <CardContent>
                    <Select
                        onValueChange={(value) =>
                            onFilterChange({ ...filters, sort_by: value })
                        }
                        value={filters.sort_by}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {sortOptions.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            {/* Genre */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">Genres</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    {genres.map((genre) => (
                        <button
                            className={`block w-full rounded px-3 py-2 text-left text-sm transition-colors ${
                                filters.genre === genre.id
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-accent"
                            }`}
                            key={genre.id}
                            onClick={() =>
                                onFilterChange({
                                    ...filters,
                                    genre:
                                        filters.genre === genre.id
                                            ? undefined
                                            : genre.id,
                                })
                            }
                            type="button"
                        >
                            {genre.name}
                        </button>
                    ))}
                </CardContent>
            </Card>

            {/* Year */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">Year</CardTitle>
                </CardHeader>
                <CardContent>
                    <Select
                        onValueChange={(value) =>
                            onFilterChange({
                                ...filters,
                                year: value ? Number(value) : undefined,
                            })
                        }
                        value={filters.year ? String(filters.year) : ""}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from(
                                { length: 30 },
                                (_, i) => new Date().getFullYear() - i
                            ).map((year) => (
                                <SelectItem key={year} value={String(year)}>
                                    {year}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            {/* Rating */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">Minimum Rating</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Slider
                        className="w-full"
                        max={10}
                        min={0}
                        onValueChange={(value) =>
                            onFilterChange({
                                ...filters,
                                "vote_average.gte": value[0] || undefined,
                            })
                        }
                        step={0.5}
                        value={[filters["vote_average.gte"] || 0]}
                    />
                    <div className="text-center font-medium text-sm">
                        {filters["vote_average.gte"] || 0} / 10
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
