import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/person/$personId")({
    component: RouteComponent,
    parseParams: (params) => ({ personId: Number(params.personId) }),
    errorComponent: ({ error }) => (
        <div className="container mx-auto px-4 py-16">
            <div className="space-y-4 text-center">
                <h1 className="font-bold text-4xl">Person Page Error</h1>
                <p className="text-muted-foreground">{error.message}</p>
            </div>
        </div>
    ),
});

function RouteComponent() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="mx-auto max-w-2xl space-y-6 text-center">
                <h1 className="font-bold text-3xl">Person Page</h1>
                <p className="text-muted-foreground">
                    This page is under construction. Check back soon for the
                    person profile.
                </p>
                <div>
                    <Link className="text-primary hover:underline" to="/">
                        Go to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
