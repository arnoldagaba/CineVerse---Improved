import { AlertTriangle } from "lucide-react";
import { Component, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

type Props = {
    children: ReactNode;
    fallback?: (error: Error, reset: () => void) => ReactNode;
};

type State = {
    hasError: boolean;
    error: Error | null;
};

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log error to console in development
        if (import.meta.env.DEV) {
            console.error("Error caught by boundary:", error, errorInfo);
        }

        // You can also log to an error reporting service here
        // Example: Sentry.captureException(error)
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
        });
    };

    render() {
        if (this.state.hasError && this.state.error) {
            if (this.props.fallback) {
                return this.props.fallback(this.state.error, this.handleReset);
            }

            return (
                <DefaultErrorFallback
                    error={this.state.error}
                    onReset={this.handleReset}
                />
            );
        }

        return this.props.children;
    }
}

function DefaultErrorFallback({
    error,
    onReset,
}: {
    error: Error;
    onReset: () => void;
}) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-md space-y-6 text-center">
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="rounded-full bg-destructive/10 p-4">
                        <AlertTriangle className="h-8 w-8 text-destructive" />
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <h1 className="font-bold text-2xl">
                        Oops! Something went wrong
                    </h1>
                    <p className="text-muted-foreground">
                        We encountered an unexpected error. Please try again or
                        go back to the home page.
                    </p>
                </div>

                {/* Error Details (Dev Only) */}
                {import.meta.env.DEV && (
                    <div className="rounded-lg bg-muted p-4 text-left">
                        <p className="break-words font-mono text-destructive text-xs">
                            {error.message}
                        </p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col gap-3 sm:flex-row">
                    <Button className="flex-1" onClick={onReset}>
                        Try Again
                    </Button>
                    <Button asChild className="flex-1" variant="outline">
                        <a href="/">Go Home</a>
                    </Button>
                </div>
            </div>
        </div>
    );
}
