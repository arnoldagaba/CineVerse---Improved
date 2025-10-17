import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useVideoModal } from "@/hooks/use-video-modal";

export function VideoModal() {
    const { isOpen, video, closeModal } = useVideoModal();

    if (!video) {
        return null;
    }

    return (
        <Dialog onOpenChange={closeModal} open={isOpen}>
            <DialogContent className="max-w-4xl border-0 p-0">
                <div className="relative bg-black">
                    {/* Close Button */}
                    <Button
                        className="absolute top-2 right-2 z-10 text-white hover:bg-white/20"
                        onClick={closeModal}
                        size="icon"
                        variant="ghost"
                    >
                        <X className="h-4 w-4" />
                    </Button>

                    {/* Video Player */}
                    <div className="aspect-video w-full">
                        <iframe
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="h-full w-full"
                            loading="lazy"
                            src={`https://www.youtube.com/embed/${video.key}?autoplay=1&controls=1`}
                            title={video.name}
                        />
                    </div>

                    {/* Video Info */}
                    <div className="border-t bg-background p-4">
                        <h3 className="font-semibold">{video.name}</h3>
                        <p className="mt-1 text-muted-foreground text-sm">
                            {video.type}
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
