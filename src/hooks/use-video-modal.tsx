import { useState } from "react";
import type { Video } from "@/types/tmdb";

export function useVideoModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [video, setVideo] = useState<Video | null>(null);

    const openModal = (vid: Video) => {
        setVideo(vid);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setVideo(null);
    };

    return {
        isOpen,
        video,
        openModal,
        closeModal,
    };
}
