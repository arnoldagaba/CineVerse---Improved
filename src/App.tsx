/** biome-ignore-all lint/style/noMagicNumbers: <- Just ignore the lint error -> */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";

import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // Data stale after 5 minutes
            gcTime: 1000 * 60 * 30, // Keep unused data 30 minutes
            refetchOnWindowFocus: false, // Don't refetch when window regains focus
            refetchOnMount: true, // Refetch when component mounts if data is stale
            refetchOnReconnect: true, // Refetch when reconnecting to internet
            retry: 1, // Retry failed requests once
        },
        mutations: {
            retry: 0, // Don't retry mutations
        },
    },
});

const router = createRouter({
    routeTree,
    context: {
        queryClient,
    },
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
    // biome-ignore lint/nursery/useConsistentTypeDefinitions: <- Just ignore the lint error ->
    interface Register {
        router: typeof router;
    }
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <Toaster position="bottom-right" />
        </QueryClientProvider>
    );
}

export default App;
