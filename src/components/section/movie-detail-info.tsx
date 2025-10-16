/** biome-ignore-all lint/style/noMagicNumbers: <- Just ignore the lint error -> */
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MovieDetail } from "@/types/tmdb";

type MovieDetailInfoProps = {
    movie: MovieDetail;
};

export function MovieDetailInfo({ movie }: MovieDetailInfoProps) {
    return (
        <div className="space-y-6">
            {/* Overview */}
            <Card>
                <CardHeader>
                    <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-base text-foreground/80 leading-relaxed">
                        {movie.overview}
                    </p>
                </CardContent>
            </Card>

            {/* Genres */}
            {movie.genres.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Genres</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {movie.genres.map((genre) => (
                                <Link
                                    key={genre.id}
                                    search={{ genre: genre.id, type: "movie" }}
                                    to="/discover"
                                >
                                    <Badge
                                        className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground"
                                        variant="secondary"
                                    >
                                        {genre.name}
                                    </Badge>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Details Grid */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Details</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        {movie.runtime && (
                            <DetailRow
                                label="Runtime"
                                value={`${movie.runtime} minutes`}
                            />
                        )}
                        <DetailRow
                            label="Release Date"
                            value={new Date(
                                movie.release_date
                            ).toLocaleDateString()}
                        />
                        <DetailRow label="Status" value={movie.status} />
                        <DetailRow
                            label="Language"
                            value={movie.original_language.toUpperCase()}
                        />
                        {movie.budget > 0 && (
                            <DetailRow
                                label="Budget"
                                value={`$${(movie.budget / 1_000_000).toFixed(1)}M`}
                            />
                        )}
                        {movie.revenue > 0 && (
                            <DetailRow
                                label="Revenue"
                                value={`$${(movie.revenue / 1_000_000).toFixed(1)}M`}
                            />
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Production Companies */}
            {movie.production_companies.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Production</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="flex flex-wrap gap-3 space-y-2">
                            {movie.production_companies.map((company) => (
                                <div
                                    className="rounded-md border border-gray-100 p-1.5 text-sm"
                                    key={company.id}
                                >
                                    {company.logo_path ? (
                                        // biome-ignore lint/performance/noImgElement: <- Just ignore the lint error ->
                                        // biome-ignore lint/nursery/useImageSize: <- Just ignore the lint error ->
                                        <img
                                            alt={company.name}
                                            className="h-10 object-contain"
                                            src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                        />
                                    ) : (
                                        <span>{company.name}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

function DetailRow({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="font-medium text-muted-foreground text-xs">{label}</p>
            <p className="font-semibold text-sm">{value}</p>
        </div>
    );
}
