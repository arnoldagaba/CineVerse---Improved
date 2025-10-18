import { createFileRoute } from "@tanstack/react-router";
import { WatchlistPage } from "@/pages/watchlist";

export const Route = createFileRoute("/watchlist")({
    component: RouteComponent,
    head: () => ({
        meta: [
            {
                title: "My Watchlist - Cineverse",
            },
        ],
    }),
});

function RouteComponent() {
    return <WatchlistPage />;
}
