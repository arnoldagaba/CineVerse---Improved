import { Link } from "@tanstack/react-router";
import { Bookmark, Film, Menu } from "lucide-react";
import { useState } from "react";
import { SearchBar } from "@/components/search/search-bar";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useWatchlistStore } from "@/stores/watchlist";

export function Navbar() {
    const { items: watchlistItems } = useWatchlistStore();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link
                        className="flex items-center gap-2 font-bold text-xl transition-opacity hover:opacity-80"
                        to="/"
                    >
                        <Film className="h-6 w-6 text-primary" />
                        <span className="hidden sm:inline">Cineverse</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-1 md:flex">
                        <NavLink
                            search={{ type: "movie", sort: "popularity.desc" }}
                            to="/discover"
                        >
                            Discover
                        </NavLink>
                        <NavLink
                            search={{ type: "all", timeWindow: "day" }}
                            to="/trending"
                        >
                            Trending
                        </NavLink>
                    </div>

                    {/* Search Bar - Desktop */}
                    <div className="mx-8 hidden max-w-sm flex-1 md:block">
                        <SearchBar />
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                        {/* Watchlist Button */}
                        <Button
                            asChild
                            className="relative gap-2"
                            size="sm"
                            variant="ghost"
                        >
                            <Link to="/watchlist">
                                <Bookmark className="h-5 w-5" />
                                <span className="hidden text-sm sm:inline">
                                    Watchlist
                                </span>
                                {watchlistItems.length > 0 && (
                                    <span className="-top-1 -right-1 absolute flex h-5 w-5 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground text-xs">
                                        {watchlistItems.length > 99
                                            ? "99+"
                                            : watchlistItems.length}
                                    </span>
                                )}
                            </Link>
                        </Button>

                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Mobile Menu */}
                        <Sheet onOpenChange={setIsOpen} open={isOpen}>
                            <SheetTrigger asChild className="md:hidden">
                                <Button size="icon" variant="ghost">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>

                            <SheetContent side="right">
                                <MobileMenu onClose={() => setIsOpen(false)} />
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>

                {/* Search Bar - Mobile */}
                <div className="pb-4 md:hidden">
                    <SearchBar />
                </div>
            </div>
        </nav>
    );
}

function NavLink({
    to,
    search,
    children,
}: {
    to: string;
    search?: Record<string, unknown>;
    children: React.ReactNode;
}) {
    return (
        <Button asChild size="sm" variant="ghost">
            <Link
                className="data-[status=active]:text-primary"
                search={search}
                to={to}
            >
                {children}
            </Link>
        </Button>
    );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
    return (
        <div className="mt-8 space-y-4">
            <div>
                <h3 className="mb-3 font-semibold">Navigation</h3>
                <div className="space-y-2">
                    <MobileNavLink
                        onClick={onClose}
                        search={{ type: "movie" }}
                        to="/discover"
                    >
                        Discover Movies
                    </MobileNavLink>
                    <MobileNavLink
                        onClick={onClose}
                        search={{ type: "tv" }}
                        to="/discover"
                    >
                        Discover TV Shows
                    </MobileNavLink>
                    <MobileNavLink
                        onClick={onClose}
                        search={{ type: "all", timeWindow: "day" }}
                        to="/trending"
                    >
                        Trending
                    </MobileNavLink>
                    <MobileNavLink onClick={onClose} to="/watchlist">
                        My Watchlist
                    </MobileNavLink>
                </div>
            </div>
        </div>
    );
}

function MobileNavLink({
    to,
    search,
    onClick,
    children,
}: {
    to: string;
    search?: Record<string, unknown>;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <Link
            className="block rounded-md px-4 py-2 text-sm transition-colors hover:bg-accent"
            onClick={onClick}
            search={search}
            to={to}
        >
            {children}
        </Link>
    );
}
