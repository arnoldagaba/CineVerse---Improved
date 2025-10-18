/** biome-ignore-all lint/style/noMagicNumbers: <- Just ignore the lint error -> */
import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProfileUrl } from "@/config/tmdb";
import type { CastMember } from "@/types/tmdb";

type CastSectionProps = {
    cast: CastMember[];
    fullList?: boolean;
};

export function CastSection({ cast, fullList = false }: CastSectionProps) {
    const displayCast = fullList ? cast : cast.slice(0, 8);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{fullList ? "Full Cast" : "Cast"}</CardTitle>
            </CardHeader>
            <CardContent>
                <div
                    className={`grid grid-cols-2 sm:grid-cols-3 ${fullList ? "md:grid-cols-4" : "md:grid-cols-4"} lg:grid-cols-${fullList ? "6" : "4"} gap-4`}
                >
                    {displayCast.map((member) => (
                        <Link
                            className="group"
                            key={member.id}
                            params={{ personId: member.id }}
                            to="/person/$personId"
                        >
                            <div className="space-y-2">
                                <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-muted">
                                    {/** biome-ignore lint/nursery/useImageSize: <- Just ignore the lint error -> */}
                                    {/** biome-ignore lint/performance/noImgElement: <- Just ignore the lint error -> */}
                                    <img
                                        alt={member.name}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        loading="lazy"
                                        src={getProfileUrl(member.profile_path)}
                                    />
                                </div>

                                <div>
                                    <p className="line-clamp-1 font-semibold text-sm transition-colors group-hover:text-primary">
                                        {member.name}
                                    </p>
                                    <p className="line-clamp-1 text-muted-foreground text-xs">
                                        {member.character}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
