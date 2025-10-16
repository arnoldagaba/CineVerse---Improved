/** biome-ignore-all lint/style/noMagicNumbers: <- Just ignore the lint error -> */
import { Play } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useVideoModal } from "@/hooks/use-video-modal";
import type { Video } from "@/types/tmdb";

type VideosSectionProps = {
    videos: Video[];
};

export function VideosSection({ videos }: VideosSectionProps) {
    const { openModal } = useVideoModal();
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

    const filteredVideos = videos.filter((v) => v.site === "YouTube");

    if (filteredVideos.length === 0) {
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Videos</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {filteredVideos.slice(0, 4).map((video) => (
                        <button
                            className="flex cursor-pointer items-start gap-4 rounded-lg border p-3 transition-colors hover:bg-accent"
                            key={video.id}
                            onClick={() => openModal(video)}
                            type="button"
                        >
                            {/* Thumbnail */}
                            <div className="relative h-14 w-24 flex-shrink-0 overflow-hidden rounded bg-muted">
                                {/** biome-ignore lint/performance/noImgElement: <- Just ignore the lint error -> */}
                                {/** biome-ignore lint/nursery/useImageSize: <- Just ignore the lint error -> */}
                                <img
                                    alt={video.name}
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                    src={`https://img.youtube.com/vi/${video.key}/default.jpg`}
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors hover:bg-black/60">
                                    <Play className="h-4 w-4 text-white" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="min-w-0 flex-1">
                                <div className="mb-1 flex items-start justify-between gap-2">
                                    <h4 className="line-clamp-2 font-semibold text-sm">
                                        {video.name}
                                    </h4>
                                    <Badge
                                        className="flex-shrink-0"
                                        variant="outline"
                                    >
                                        {video.type}
                                    </Badge>
                                </div>
                                <p className="text-muted-foreground text-xs">
                                    {new Date(
                                        video.published_at
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
