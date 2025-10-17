/** biome-ignore-all lint/style/noMagicNumbers: <- Ignore the lint error -> */

import { useSuspenseQuery } from "@tanstack/react-query";
import { useMatch } from "@tanstack/react-router";
import { personQueryOptions } from "@/api/queries";
import { MovieGrid } from "@/components/grid/movie";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProfileUrl } from "@/config/tmdb";

export function PersonDetailPage() {
    const match = useMatch({ from: "/person/$personId" });
    const personId = match.params.personId;

    const { data: person } = useSuspenseQuery(
        personQueryOptions.detail(personId)
    );
    const { data: movieCredits } = useSuspenseQuery(
        personQueryOptions.movieCredits(personId)
    );
    const { data: tvCredits } = useSuspenseQuery(
        personQueryOptions.tvCredits(personId)
    );

    const profileUrl = getProfileUrl(person.profile_path);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Sidebar */}
                <aside className="lg:col-span-1">
                    <Card className="overflow-hidden">
                        {/** biome-ignore lint/performance/noImgElement: <- Just ignore the lint error -> */}
                        <img
                            alt={person.name}
                            className="h-auto w-full"
                            height={512}
                            loading="lazy"
                            src={profileUrl}
                            width={342}
                        />
                    </Card>

                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle className="text-base">
                                Personal Info
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {person.birthday && (
                                <div>
                                    <p className="font-medium text-muted-foreground text-xs">
                                        Birthday
                                    </p>
                                    <p className="text-sm">
                                        {new Date(
                                            person.birthday
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            )}

                            {person.place_of_birth && (
                                <div>
                                    <p className="font-medium text-muted-foreground text-xs">
                                        Place of Birth
                                    </p>
                                    <p className="text-sm">
                                        {person.place_of_birth}
                                    </p>
                                </div>
                            )}

                            <div>
                                <p className="font-medium text-muted-foreground text-xs">
                                    Known For
                                </p>
                                <p className="text-sm">
                                    {person.known_for_department}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </aside>

                {/* Main Content */}
                <main className="space-y-8 lg:col-span-2">
                    {/* Header */}
                    <div>
                        <h1 className="mb-2 font-bold text-4xl">
                            {person.name}
                        </h1>
                        {person.also_known_as.length > 0 && (
                            <p className="text-muted-foreground text-sm">
                                Also known as: {person.also_known_as.join(", ")}
                            </p>
                        )}
                    </div>

                    {/* Biography */}
                    {person.biography && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Biography</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground/80 text-sm leading-relaxed">
                                    {person.biography}
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Filmography */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Filmography</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs className="w-full" defaultValue="movies">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="movies">
                                        Movies ({movieCredits.cast.length})
                                    </TabsTrigger>
                                    <TabsTrigger value="tv">
                                        TV Shows ({tvCredits.cast.length})
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent className="mt-6" value="movies">
                                    {movieCredits.cast.length > 0 ? (
                                        <MovieGrid
                                            movies={movieCredits.cast.slice(
                                                0,
                                                12
                                            )}
                                        />
                                    ) : (
                                        <p className="text-muted-foreground">No movie 
                                        credits</p>
                                    )}
                                </TabsContent>

                                <TabsContent className="mt-6" value="tv">
                                    {tvCredits.cast.length > 0 ? (
                                        <MovieGrid
                                            movies={tvCredits.cast.slice(0, 12)}
                                        />
                                    ) : (
                                        <p className="text-muted-foreground">No TV 
                                        credits</p>
                                    )}
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
}
