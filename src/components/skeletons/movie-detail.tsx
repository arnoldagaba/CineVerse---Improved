import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function MovieDetailSkeleton() {
    return (
        <div className="space-y-8">
            {/* Hero */}
            <Skeleton className="h-96 w-full rounded-none sm:h-[500px]" />

            {/* Content */}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="space-y-8 lg:col-span-2">
                        {/* Overview Card */}
                        <Card>
                            <CardHeader>
                                <Skeleton className="h-6 w-24" />
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </CardContent>
                        </Card>

                        {/* Cast Grid */}
                        <div>
                            <Skeleton className="mb-4 h-6 w-24" />
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div className="space-y-2" key={i}>
                                        <Skeleton className="aspect-[2/3] rounded-lg" />
                                        <Skeleton className="h-3 w-3/4" />
                                        <Skeleton className="h-2 w-1/2" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        <Skeleton className="aspect-[2/3] rounded-lg" />
                        <Skeleton className="h-32 rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
}
