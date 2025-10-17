/** biome-ignore-all lint/style/noMagicNumbers: <- Ignore the lint error -> */
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { SearchPage } from "@/pages/search";

export const Route = createFileRoute("/search")({
    component: RouteComponent,
    validateSearch: (search: Record<string, unknown>) => ({
        q: (search.q as string) || "",
        type: (search.type as "all" | "movie" | "tv" | "person") || "all",
    }),
});

function RouteComponent() {
    return (
        <Suspense fallback={<div className="p-8">Loading…</div>}>
            <SearchPage />
        </Suspense>
    );
}
