import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Review } from "@/types/tmdb";

type ReviewsSectionProps = {
    reviews: Review[];
    movieId: number;
};

export function ReviewsSection({ reviews, movieId }: ReviewsSectionProps) {
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

    const toggleExpanded = (id: string) => {
        const newExpanded = new Set(expandedIds);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedIds(newExpanded);
    };

    if (reviews.length === 0) {
        return (
            <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                    No reviews yet
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {reviews.map((review) => (
                <Card key={review.id}>
                    <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                                <h4 className="font-semibold">
                                    {review.author}
                                </h4>
                                
                                <p className="text-muted-foreground text-xs">
                                    {new Date(
                                        review.created_at
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                            {review.author_details.rating && (
                                <Badge className="bg-primary/80">
                                    ⭐ {review.author_details.rating}/10
                                </Badge>
                            )}
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        <p
                            className={`text-sm leading-relaxed ${
                                expandedIds.has(review.id) ? "" : "line-clamp-3"
                            }`}
                        >
                            {review.content}
                        </p>

                        {review.content.length > 300 && (
                            <Button
                                onClick={() => toggleExpanded(review.id)}
                                size="sm"
                                variant="ghost"
                            >
                                {expandedIds.has(review.id)
                                    ? "Show Less"
                                    : "Show More"}
                            </Button>
                        )}

                        <div className="flex items-center gap-2 pt-2">
                            <Button className="gap-2" size="sm" variant="ghost">
                                <ThumbsUp className="h-4 w-4" />
                                Helpful
                            </Button>

                            <Button className="gap-2" size="sm" variant="ghost">
                                <ThumbsDown className="h-4 w-4" />
                                Not Helpful
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
