import { create } from "zustand";
import type { Video } from "@/types/tmdb";

type VideoModalStore = {
    isOpen: boolean;
    video: Video | null;
    openModal: (video: Video) => void;
    closeModal: () => void;
};

export const useVideoModalStore = create<VideoModalStore>((set) => ({
    isOpen: false,
    video: null,
    openModal: (video) => set({ isOpen: true, video }),
    closeModal: () => set({ isOpen: false, video: null }),
}));
