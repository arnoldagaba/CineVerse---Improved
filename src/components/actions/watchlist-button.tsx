import { Bookmark, BookmarkCheck } from "lucide-react";
import type { ReactNode } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWatchlistStore } from "@/stores/watchlist";

type WatchlistButtonProps = {
    id: number;
    type: "movie" | "tv";
    children?: ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    variant?:
        | "link"
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | null
        | undefined;
    size?:
        | "default"
        | "sm"
        | "lg"
        | "icon"
        | "icon-sm"
        | "icon-lg"
        | null
        | undefined;
};

export function WatchlistButton({
    id,
    type,
    children,
    onClick,
    className,
    size,
    variant,
    ...props
}: WatchlistButtonProps) {
    const { isInWatchlist, addToWatchlist, removeFromWatchlist } =
        useWatchlistStore();
    const inWatchlist = isInWatchlist(id);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();

        if (inWatchlist) {
            removeFromWatchlist(id);
            toast.success("Removed from watchlist");
        } else {
            addToWatchlist(id, type);
            toast.success("Added to watchlist");
        }

        onClick?.(e);
    };

    return (
        <Button
            aria-label={
                inWatchlist ? "Remove from watchlist" : "Add to watchlist"
            }
            aria-pressed={inWatchlist}
            className={cn(className)}
            onClick={handleClick}
            size={size}
            variant={variant}
            {...props}
        >
            {inWatchlist ? (
                <>
                    <BookmarkCheck className="h-4 w-4" />
                    {children || "Saved"}
                </>
            ) : (
                <>
                    <Bookmark className="h-4 w-4" />
                    {children || "Save"}
                </>
            )}
        </Button>
    );
}
