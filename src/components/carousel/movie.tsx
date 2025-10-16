import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MovieCard } from "@/components/cards/movie";
import { Button } from "@/components/ui/button";
import type { Movie } from "@/types/tmdb";

type MovieCarouselProps = {
    movies: Movie[];
    showControls?: boolean;
};

export function MovieCarousel({
    movies,
    showControls = true,
}: MovieCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            setCanScrollLeft(scrollRef.current.scrollLeft > 0);
            setCanScrollRight(
                scrollRef.current.scrollLeft <
                    scrollRef.current.scrollWidth -
                        scrollRef.current.clientWidth
            );
        }
    };

    // biome-ignore lint/correctness/useExhaustiveDependencies: <- Just ignore the lint error ->
    useEffect(() => {
        checkScroll();
        const carousel = scrollRef.current;
        carousel?.addEventListener("scroll", checkScroll);
        window.addEventListener("resize", checkScroll);

        return () => {
            carousel?.removeEventListener("scroll", checkScroll);
            window.removeEventListener("resize", checkScroll);
        };
    }, [movies]);

    const scroll = (direction: "left" | "right") => {
        const scrollAmount = 400;
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="group relative">
            {/* Left Button */}
            {showControls && canScrollLeft && (
                <Button
                    className="-translate-y-1/2 absolute top-1/2 left-0 z-10 rounded-full opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
                    onClick={() => scroll("left")}
                    size="icon"
                    variant="secondary"
                >
                    <ChevronLeft className="h-5 w-5" />
                </Button>
            )}

            {/* Carousel Container */}
            <div
                className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4"
                ref={scrollRef}
            >
                {movies.map((movie) => (
                    <div
                        className="w-[calc(100%/6)] min-w-max flex-none snap-start"
                        key={movie.id}
                    >
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>

            {/* Right Button */}
            {showControls && canScrollRight && (
                <Button
                    className="-translate-y-1/2 absolute top-1/2 right-0 z-10 rounded-full opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
                    onClick={() => scroll("right")}
                    size="icon"
                    variant="secondary"
                >
                    <ChevronRight className="h-5 w-5" />
                </Button>
            )}
        </div>
    );
}
