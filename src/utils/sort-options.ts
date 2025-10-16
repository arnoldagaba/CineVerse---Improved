export const MOVIE_SORT_OPTIONS = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    { value: "release_date.desc", label: "Release Date Descending" },
    { value: "release_date.asc", label: "Release Date Ascending" },
    { value: "title.asc", label: "Title (A-Z)" },
    { value: "title.desc", label: "Title (Z-A)" },
    { value: "revenue.desc", label: "Revenue Descending" },
    { value: "revenue.asc", label: "Revenue Ascending" },
] as const;

export const TV_SORT_OPTIONS = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    { value: "first_air_date.desc", label: "First Air Date Descending" },
    { value: "first_air_date.asc", label: "First Air Date Ascending" },
    { value: "name.asc", label: "Name (A-Z)" },
    { value: "name.desc", label: "Name (Z-A)" },
] as const;

export type MovieSortOption = (typeof MOVIE_SORT_OPTIONS)[number]["value"];
export type TVSortOption = (typeof TV_SORT_OPTIONS)[number]["value"];
