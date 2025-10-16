import { Link } from "@tanstack/react-router";
import { Film, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-12">
                <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <Link
                            className="mb-2 flex items-center gap-2 font-bold text-lg"
                            to="/"
                        >
                            <Film className="h-6 w-6 text-primary" />
                            <span>Cineverse</span>
                        </Link>
                        <p className="text-muted-foreground text-sm">
                            Discover movies and TV shows with personalized
                            recommendations.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="mb-4 font-semibold">Navigation</h4>
                        <ul className="space-y-2">
                            <li>
                                <Button
                                    asChild
                                    className="h-auto p-0"
                                    variant="link"
                                >
                                    <Link
                                        search={{ type: "movie" }}
                                        to="/discover"
                                    >
                                        Discover Movies
                                    </Link>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    asChild
                                    className="h-auto p-0"
                                    variant="link"
                                >
                                    <Link
                                        search={{ type: "tv" }}
                                        to="/discover"
                                    >
                                        Discover TV Shows
                                    </Link>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    asChild
                                    className="h-auto p-0"
                                    variant="link"
                                >
                                    <Link to="/trending">Trending</Link>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    asChild
                                    className="h-auto p-0"
                                    variant="link"
                                >
                                    <Link to="/watchlist">My Watchlist</Link>
                                </Button>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="mb-4 font-semibold">Resources</h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                                    href="https://www.themoviedb.org/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    TMDB API
                                </a>
                            </li>
                            <li>
                                <a
                                    className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                                    href="https://www.themoviedb.org/settings/privacy"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                                    href="https://www.themoviedb.org/settings/terms"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="mb-4 font-semibold">Connect</h4>
                        <div className="flex gap-2">
                            <Button
                                asChild
                                className="rounded-full"
                                size="icon"
                                variant="outline"
                            >
                                <a
                                    aria-label="GitHub"
                                    href="https://github.com"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <Github className="h-4 w-4" />
                                </a>
                            </Button>
                            <Button
                                asChild
                                className="rounded-full"
                                size="icon"
                                variant="outline"
                            >
                                <a
                                    aria-label="Email"
                                    href="mailto:contact@cineverse.com"
                                >
                                    <Mail className="h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t pt-8">
                    {/* Copyright */}
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-muted-foreground text-sm">
                            © {currentYear} Cineverse. All rights reserved.
                        </p>
                        <p className="text-muted-foreground text-sm">
                            Data provided by{" "}
                            <a
                                className="text-primary hover:underline"
                                href="https://www.themoviedb.org/"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                The Movie Database (TMDB)
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
