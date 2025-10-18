import { create } from "zustand";
import { persist } from "zustand/middleware";

type WatchlistItem = {
    id: number;
    type: "movie" | "tv";
    addedAt: number;
};

type WatchlistStore = {
    items: WatchlistItem[];
    addToWatchlist: (id: number, type: WatchlistItem['type']) => void;
    removeFromWatchlist: (id: number) => void;
    isInWatchlist: (id: number) => boolean;
};

export const useWatchlistStore = create<WatchlistStore>()(
    persist(
        (set, get) => ({
            items: [],
            addToWatchlist: (id, type) => {
                // If legacy numeric ids were persisted, normalize them now.
                const cur = get();
                const maybeItems = cur?.items;
                if (Array.isArray(maybeItems) && maybeItems.length > 0 && typeof maybeItems[0] === "number") {
                    const migrated: WatchlistItem[] = (maybeItems as unknown as number[]).map((nid) => ({ id: nid, type: "movie", addedAt: Date.now() }));
                    set(() => ({ items: migrated }));
                }

                set((state) => {
                    const exists = state.items.find((i) => i.id === id);
                    if (exists) {
                        return { items: state.items };
                    }
                    const newItem: WatchlistItem = { id, type, addedAt: Date.now() };
                    return { items: [...state.items, newItem] };
                });
            },
            isInWatchlist: (id) => {
                const cur = get();
                const maybeItems = cur?.items;
                if (Array.isArray(maybeItems) && maybeItems.length > 0 && typeof maybeItems[0] === "number") {
                    const migrated: WatchlistItem[] = (maybeItems as unknown as number[]).map((nid) => ({ id: nid, type: "movie", addedAt: Date.now() }));
                    set(() => ({ items: migrated }));
                }

                return get().items.some((item) => item.id === id);
            },
            removeFromWatchlist: (id) => {
                const cur = get();
                const maybeItems = cur?.items;
                if (Array.isArray(maybeItems) && maybeItems.length > 0 && typeof maybeItems[0] === "number") {
                    const migrated: WatchlistItem[] = (maybeItems as unknown as number[]).map((nid) => ({ id: nid, type: "movie", addedAt: Date.now() }));
                    set(() => ({ items: migrated }));
                }

                set((state) => ({ items: state.items.filter((item) => item.id !== id) }));
            },
        }),
        {
            name: "watchlist-storage", // Key in localStorage
            // No-op options; migration is handled lazily in runtime to avoid
            // depending on persist lifecycle specifics.
        }
    )
);

// No helper needed; migration happens inline where required.
