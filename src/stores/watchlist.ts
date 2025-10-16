import { create } from "zustand";
import { persist } from "zustand/middleware";

type WatchlistStore = {
    items: number[];
    addToWatchlist: (id: number) => void;
    removeFromWatchlist: (id: number) => void;
    isInWatchlist: (id: number) => boolean;
};

export const useWatchlistStore = create<WatchlistStore>()(
    persist(
        (set, get) => ({
            items: [],
            addToWatchlist: (id) => {
                set((state) => ({
                    items: [...state.items, id],
                }));
            },
            isInWatchlist: (id) => !!get().items.find((item) => item === id),
            removeFromWatchlist: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item !== id),
                })),
        }),
        {
            name: "watchlist-storage", // Key in localStorage
        }
    )
);
