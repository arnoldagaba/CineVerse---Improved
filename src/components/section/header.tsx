import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type SectionHeaderProps = {
    title: string;
    subtitle?: string;
    viewAllHref?: string;
};

export function SectionHeader({
    title,
    subtitle,
    viewAllHref,
}: SectionHeaderProps) {
    return (
        <div className="mb-6 flex items-start justify-between">
            <div>
                <h2 className="mb-2 font-bold text-3xl tracking-tight">
                    {title}
                </h2>
                
                {subtitle && (
                    <p className="max-w-lg text-muted-foreground text-sm">
                        {subtitle}
                    </p>
                )}
            </div>
            
            {viewAllHref && (
                <Button
                    asChild
                    className="flex items-center gap-2"
                    size="sm"
                    variant="outline"
                >
                    <Link to={viewAllHref}>
                        View All
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
            )}
        </div>
    );
}
