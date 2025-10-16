import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CrewMember } from "@/types/tmdb";

type CreditsSectionProps = {
    crew: CrewMember[];
};

export function CreditsSection({ crew }: CreditsSectionProps) {
    // Group by department
    const groupedCrew = crew.reduce(
        (acc, member) => {
            if (!acc[member.department]) {
                acc[member.department] = [];
            }
            acc[member.department].push(member);
            return acc;
        },
        {} as Record<string, CrewMember[]>
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Crew</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {Object.entries(groupedCrew).map(
                        ([department, members]) => (
                            <div key={department}>
                                <h4 className="mb-3 font-semibold text-primary text-sm">
                                    {department}
                                </h4>
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                    {/** biome-ignore lint/style/noMagicNumbers: <-> */}
                                    {members.slice(0, 6).map((member) => (
                                        <div key={member.id}>
                                            <p className="font-medium text-sm">
                                                {member.name}
                                            </p>
                                            <p className="text-muted-foreground text-xs">
                                                {member.job}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
