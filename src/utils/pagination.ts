import { useNavigate, useSearch } from "@tanstack/react-router";

/**
 * Hook for managing pagination state in URL search params
 * @param from - Route path to use for search params and navigation
 */
export function usePaginationParams(
    from:
        | "/discover"
        | "/search"
        | "/watchlist"
        | "/trending"
        | "/" = "/discover"
) {
    const navigate = useNavigate();
    const search = useSearch({ from });

    // Assert search includes page since we're using discover route by default
    type SearchWithPage = { page?: number | string } & Record<string, unknown>;
    const searchWithPage = search as SearchWithPage;

    const currentPage = Number(searchWithPage.page) || 1;

    const setPage = (page: number) => {
        navigate({
            to: from,
            search: { ...(searchWithPage as Record<string, unknown>), page },
        });
    };

    const nextPage = () => setPage(currentPage + 1);
    const prevPage = () => setPage(Math.max(1, currentPage - 1));
    const firstPage = () => setPage(1);
    const lastPage = (totalPages: number) => setPage(totalPages);

    return {
        currentPage,
        setPage,
        nextPage,
        prevPage,
        firstPage,
        lastPage,
    };
}

/**
 * Calculate range of items shown on current page
 */
export function getPageRange(
    page: number,
    totalResults: number,
    resultsPerPage = 20
): { start: number; end: number; total: number } {
    const start = (page - 1) * resultsPerPage + 1;
    const end = Math.min(page * resultsPerPage, totalResults);

    return { start, end, total: totalResults };
}

/**
 * Format page range for display
 * Example: "Showing 21-40 of 1,234 results"
 */
export function formatPageRange(
    page: number,
    totalResults: number,
    resultsPerPage = 20
): string {
    const { start, end, total } = getPageRange(
        page,
        totalResults,
        resultsPerPage
    );
    const formattedTotal = total.toLocaleString();

    if (total === 0) {
        return "No results found";
    }

    if (start === end) {
        return `Showing ${start} of ${formattedTotal} results`;
    }

    return `Showing ${start}-${end} of ${formattedTotal} results`;
}

/**
 * Check if there are more pages available
 */
export function hasMorePages(page: number, totalPages: number): boolean {
    return page < totalPages;
}

/**
 * Generate SEO-friendly page metadata
 */
export function getPageMetadata(
    page: number,
    totalPages: number,
    baseUrl: string
): {
    title: string;
    canonical: string;
    prev?: string;
    next?: string;
} {
    const title = page > 1 ? `Page ${page}` : "";
    const canonical = page === 1 ? baseUrl : `${baseUrl}?page=${page}`;

    const metadata: ReturnType<typeof getPageMetadata> = {
        title,
        canonical,
    };

    if (page > 1) {
        metadata.prev = page === 2 ? baseUrl : `${baseUrl}?page=${page - 1}`;
    }

    if (page < totalPages) {
        metadata.next = `${baseUrl}?page=${page + 1}`;
    }

    return metadata;
}

/**
 * Generate a pagination range for UI page buttons.
 * Returns an array containing page numbers and '...' strings for ellipses.
 * Example: [1, '...', 4, 5, 6, '...', 10]
 */
export function getPaginationRange(
    currentPage: number,
    totalPages: number,
    maxVisible = 7
): Array<number | "..."> {
    const pages: Array<number | "..."> = [];
    if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    }

    const siblings = 1; // pages to show on each side of current
    const left = Math.max(2, currentPage - siblings);
    const right = Math.min(totalPages - 1, currentPage + siblings);

    pages.push(1);

    if (left > 2) {
        pages.push("...");
    }

    for (let i = left; i <= right; i++) {
        pages.push(i);
    }

    if (right < totalPages - 1) {
        pages.push("...");
    }

    pages.push(totalPages);
    return pages;
}
