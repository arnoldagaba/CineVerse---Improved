import type { InfiniteData } from "@tanstack/react-query";

const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const MS = 1000;
const MINUTE = SECONDS_IN_MINUTE * MS;
const HOUR = MINUTES_IN_HOUR * MINUTE;

export const STALE = {
    short: ((): number => {
        const SHORT_MINUTES = 5;
        return SHORT_MINUTES * MINUTE;
    })(),
    medium: ((): number => {
        const MEDIUM_MINUTES = 10;
        return MEDIUM_MINUTES * MINUTE;
    })(),
    long: ((): number => {
        const LONG_MINUTES = 30;
        return LONG_MINUTES * MINUTE;
    })(),
    day: ((): number => {
        const HOURS_IN_DAY = 24;
        return HOURS_IN_DAY * HOUR;
    })(),
} as const;

export function safeArray<T>(arr: T[] | undefined | null): T[] {
    return Array.isArray(arr) ? arr : [];
}

export function placeholderInfinite<TPage extends { results: unknown[] }>(
    initial: TPage
) {
    return (prev: InfiniteData<TPage> | undefined): InfiniteData<TPage> =>
        prev ??
        ({
            pages: [initial],
            pageParams: [1],
        } as InfiniteData<TPage>);
}
