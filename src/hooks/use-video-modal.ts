import { useVideoModalStore } from "@/stores/video-modal";

export function useVideoModal() {
    const isOpen = useVideoModalStore((s) => s.isOpen);
    const video = useVideoModalStore((s) => s.video);
    const openModal = useVideoModalStore((s) => s.openModal);
    const closeModal = useVideoModalStore((s) => s.closeModal);

    return { isOpen, video, openModal, closeModal };
}
