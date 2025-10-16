import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

type RouterContext = {
    queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootLayout,
});

function RootLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            {/* Navbar - visible on all pages */}
            {/* <Navbar /> */}

            {/* Main content area - routes render here */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* Footer - visible on all pages */}
            {/* <Footer /> */}

            {/* Global Modal for videos */}
            {/* <VideoModal /> */}

            {/* Router devtools (development only) */}
            {import.meta.env.DEV && <TanStackRouterDevtools />}
        </div>
    );
}
