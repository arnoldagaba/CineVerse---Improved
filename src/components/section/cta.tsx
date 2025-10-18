import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
    return (
        <section className="container mx-auto px-4">
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-primary/80 to-primary/40 p-12">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[length:40px_40px] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_1px)]" />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-2xl">
                    <h2 className="mb-3 flex items-center gap-2 font-bold text-3xl text-white">
                        <Sparkles className="h-8 w-8" />
                        Start Exploring
                    </h2>

                    <p className="mb-6 text-lg text-white/90">
                        Discover thousands of movies and TV shows. Create your
                        personalized watchlist and find your next favorite
                        entertainment.
                    </p>

                    <div className="flex gap-3">
                        <Button asChild size="lg" variant="secondary">
                            <Link search={{ type: "movie" }} to="/discover">
                                Discover Movies
                            </Link>
                        </Button>

                        <Button asChild size="lg" variant="secondary">
                            <Link search={{ type: "tv" }} to="/discover">
                                Discover TV Shows
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
