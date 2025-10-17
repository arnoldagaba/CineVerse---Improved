import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TVShowDetail } from "@/types/tmdb";

type TVDetailInfoProps = {
    show: TVShowDetail;
};

export function TVDetailInfo({ show }: TVDetailInfoProps) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-base text-foreground/80 leading-relaxed">
                        {show.overview}
                    </p>
                </CardContent>
            </Card>

            {show.genres.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Genres</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {show.genres.map((genre) => (
                                <Link
                                    key={genre.id}
                                    search={{ genre: genre.id, type: "tv" }}
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

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <DetailRow
                            label="Seasons"
                            value={String(show.number_of_seasons)}
                        />
                        <DetailRow
                            label="Episodes"
                            value={String(show.number_of_episodes)}
                        />
                        <DetailRow label="Status" value={show.status} />
                        <DetailRow
                            label="First Air"
                            value={new Date(
                                show.first_air_date
                            ).toLocaleDateString()}
                        />
                        {show.last_air_date && (
                            <DetailRow
                                label="Last Air"
                                value={new Date(
                                    show.last_air_date
                                ).toLocaleDateString()}
                            />
                        )}
                        <DetailRow label="Type" value={show.type} />
                    </div>
                </CardContent>
            </Card>

            {show.networks.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Networks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {show.networks.map((network) => (
                                <div className="text-sm" key={network.id}>
                                    {network.logo_path ? (
                                        <img
                                            alt={network.name}
                                            className="h-8 object-contain"
                                            src={`https://image.tmdb.org/t/p/w200${network.logo_path}`}
                                        />
                                    ) : (
                                        <span>{network.name}</span>
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
