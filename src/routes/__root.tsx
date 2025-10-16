import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ErrorBoundary } from "@/components/error/error-boundary";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { VideoModal } from "@/components/modals/video-modal";

type RouterContext = {
    queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootLayout,
});

function RootLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <ErrorBoundary>
                <Navbar />

                <main className="flex-1">
                    <ErrorBoundary>
                        <Outlet />
                    </ErrorBoundary>
                </main>

                <Footer />

                <VideoModal />

                {import.meta.env.DEV && <TanStackRouterDevtools />}
            </ErrorBoundary>
        </div>
    );
}
