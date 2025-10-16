import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function MovieCardSkeleton() {
    return (
        <Card className="overflow-hidden">
            <CardContent className="p-0">
                <Skeleton className="h-64 w-full sm:h-72" />
            </CardContent>
            <CardHeader className="p-3">
                <Skeleton className="mb-2 h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
            </CardHeader>
        </Card>
    );
}
