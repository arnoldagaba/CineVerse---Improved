/** biome-ignore-all lint/style/noMagicNumbers: <- Just ignore the lint error -> */

import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Clock, Search, X } from "lucide-react";
import { useState } from "react";
import { searchQueryOptions } from "@/api/queries";
import { Input } from "@/components/ui/input";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { usePreferencesStore } from "@/stores/preferences";

export function SearchBar() {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const debouncedQuery = useDebouncedValue(query, 300);
    const navigate = useNavigate();
    const { searchHistory, addToSearchHistory } = usePreferencesStore();

    const { data: suggestions } = useQuery({
        ...searchQueryOptions.multi(debouncedQuery),
        enabled: debouncedQuery.length >= 2,
    });

    const handleSearch = (searchQuery: string) => {
        if (searchQuery.trim()) {
            addToSearchHistory(searchQuery);
            navigate({
                to: "/search",
                search: { q: searchQuery, type: "all" },
            });
            setQuery("");
            setIsOpen(false);
        }
    };

    const handleSuggestionClick = (result: any) => {
        addToSearchHistory(query);
        if (result.media_type === "movie") {
            navigate({ to: `/movie/${result.id}` });
        } else if (result.media_type === "tv") {
            navigate({ to: `/tv/${result.id}` });
        } else if (result.media_type === "person") {
            navigate({ to: `/person/${result.id}` });
        }
        setQuery("");
        setIsOpen(false);
    };

    return (
        <div className="relative w-full">
            <div className="relative">
                <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
                <Input
                    className="pr-8 pl-10"
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch(query);
                        }
                    }}
                    placeholder="Search movies, TV shows, people..."
                    value={query}
                />
                {query && (
                    <button
                        className="-translate-y-1/2 absolute top-1/2 right-3 text-muted-foreground hover:text-foreground"
                        onClick={() => {
                            setQuery("");
                            setIsOpen(false);
                        }}
                        type="button"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {/* Suggestions Dropdown */}
            {isOpen && (query.length >= 2 || searchHistory.length > 0) && (
                <div className="absolute top-full right-0 left-0 z-50 mt-2 max-h-96 overflow-y-auto rounded-lg border bg-popover shadow-lg">
                    {query.length >= 2 && suggestions?.results ? (
                        <div className="p-2">
                            <div className="px-2 py-1.5 font-semibold text-muted-foreground text-xs">
                                Results
                            </div>
                            {suggestions.results
                                .slice(0, 8)
                                .map((result: any) => (
                                    <button
                                        className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-accent"
                                        key={`${result.media_type}-${result.id}`}
                                        onClick={() =>
                                            handleSuggestionClick(result)
                                        }
                                        type="button"
                                    >
                                        <SearchResultThumbnail
                                            result={result}
                                        />
                                        <div className="min-w-0 flex-1">
                                            <p className="line-clamp-1 font-medium text-sm">
                                                {result.title || result.name}
                                            </p>
                                            <p className="text-muted-foreground text-xs">
                                                {result.media_type}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                        </div>
                    ) : (
                        <div className="p-2">
                            <div className="px-2 py-1.5 font-semibold text-muted-foreground text-xs">
                                Recent Searches
                            </div>
                            {searchHistory.slice(0, 5).map((term, index) => (
                                <button
                                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left transition-colors hover:bg-accent"
                                    key={index}
                                    onClick={() => handleSearch(term)}
                                    type="button"
                                >
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{term}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function SearchResultThumbnail({ result }: { result: any }) {
    let imageUrl = "/images/placeholder-profile.jpg";

    if (result.media_type === "movie" && result.poster_path) {
        imageUrl = `https://image.tmdb.org/t/p/w45${result.poster_path}`;
    } else if (result.media_type === "tv" && result.poster_path) {
        imageUrl = `https://image.tmdb.org/t/p/w45${result.poster_path}`;
    } else if (result.media_type === "person" && result.profile_path) {
        imageUrl = `https://image.tmdb.org/t/p/w45${result.profile_path}`;
    }

    return (
        <img
            alt={result.title || result.name}
            className="h-14 w-10 rounded object-cover"
            onError={(e) => {
                e.currentTarget.src = "/images/placeholder-profile.jpg";
            }}
            src={imageUrl}
        />
    );
}
