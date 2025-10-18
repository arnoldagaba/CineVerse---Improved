import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import type { Genre } from "@/types/tmdb";

type GenreQuickAccessProps = {
    genres: Genre[];
    limit?: number;
};

export function GenreQuickAccess({
    genres,
    limit = 12,
}: GenreQuickAccessProps) {
    const displayGenres = genres.slice(0, limit);

    return (
        <div className="flex flex-wrap gap-3">
            {displayGenres.map((genre) => (
                <Button
                    asChild
                    className="rounded-full transition-colors hover:bg-primary hover:text-primary-foreground"
                    key={genre.id}
                    variant="outline"
                >
                    <Link
                        search={{
                            genre: genre.id,
                            type: "movie",
                            sort_by: "popularity.desc",
                        }}
                        to="/discover"
                    >
                        {genre.name}
                    </Link>
                </Button>
            ))}
        </div>
    );
}
