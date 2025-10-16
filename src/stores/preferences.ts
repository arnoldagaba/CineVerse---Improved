import { create } from "zustand";
import { persist } from "zustand/middleware";

type Rating = {
    [key: number]: number; // movieId/tvId -> rating (1-10)
};

type PreferencesStore = {
    theme: "light" | "dark" | "system";
    ratings: Rating;
    searchHistory: string[];
    setTheme: (theme: "light" | "dark" | "system") => void;
    addRating: (id: number, rating: number) => void;
    removeRating: (id: number) => void;
    addToSearchHistory: (query: string) => void;
    clearSearchHistory: () => void;
};

export const usePreferencesStore = create<PreferencesStore>()(
    persist(
        (set, _get) => ({
            theme: "dark",
            ratings: {},
            searchHistory: [],

            setTheme: (theme) => set({ theme }),

            addRating: (id, rating) => {
                set((state) => ({
                    ratings: { ...state.ratings, [id]: rating },
                }));
            },

            removeRating: (id) => {
                set((state) => {
                    const { [id]: _, ...rest } = state.ratings;
                    return { ratings: rest };
                });
            },

            addToSearchHistory: (query) => {
                set((state) => ({
                    searchHistory: [
                        query,
                        ...state.searchHistory.filter((q) => q !== query),
                    ].slice(0, 10), // Keep only last 10 searches
                }));
            },

            clearSearchHistory: () => set({ searchHistory: [] }),
        }),
        {
            name: "cineverse-preferences",
        }
    )
);