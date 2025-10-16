/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <- Just ignore the lint error -> */

import { useEffect, useState } from "react";
import { usePreferencesStore } from "@/stores/preferences";

type Theme = "light" | "dark" | "system";

export function useTheme() {
    const { theme: storedTheme, setTheme: setStoredTheme } =
        usePreferencesStore();
    const [systemTheme, setSystemTheme] = useState<"light" | "dark">("dark");

    useEffect(() => {
        // Check system preference
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setSystemTheme(mediaQuery.matches ? "dark" : "light");

        // Listen for system theme changes
        const handler = (e: MediaQueryListEvent) => {
            setSystemTheme(e.matches ? "dark" : "light");
            applyTheme(storedTheme);
        };

        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, [storedTheme]);

    useEffect(() => {
        applyTheme(storedTheme);
    }, [storedTheme]);

    const applyTheme = (theme: Theme) => {
        const root = document.documentElement;
        const resolvedTheme = theme === "system" ? systemTheme : theme;

        if (resolvedTheme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    };

    return {
        theme: storedTheme as Theme,
        setTheme: (theme: Theme) => setStoredTheme(theme),
    };
}