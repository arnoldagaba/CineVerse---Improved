import { Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePreferencesStore } from "@/stores/preferences";

type RatingWidgetProps = {
    id: number;
};

export function RatingWidget({ id }: RatingWidgetProps) {
    const { ratings, addRating, removeRating } = usePreferencesStore();
    const [hover, setHover] = useState(0);

    const currentRating = ratings[id] || 0;

    const handleClick = (rating: number) => {
        if (rating === currentRating / 2) {
            removeRating(id);
        } else {
            addRating(id, rating * 2);
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-1">
                {/** biome-ignore lint/style/noMagicNumbers: <- Just ignore the lint error -> */}
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        className="transition-transform hover:scale-110"
                        key={star}
                        onClick={() => handleClick(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        type="button"
                    >
                        <Star
                            className={`h-6 w-6 ${
                                star <= (hover || currentRating / 2)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                            }`}
                        />
                    </button>
                ))}
            </div>

            {currentRating > 0 && (
                <div className="text-muted-foreground text-sm">
                    You rated this:{" "}
                    <span className="font-semibold text-foreground">
                        {currentRating}/10
                    </span>
                </div>
            )}

            {currentRating > 0 && (
                <Button
                    className="w-full"
                    onClick={() => removeRating(id)}
                    size="sm"
                    variant="outline"
                >
                    Clear Rating
                </Button>
            )}
        </div>
    );
}
