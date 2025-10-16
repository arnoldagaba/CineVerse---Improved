import { compositeQueryOptions } from "./composite";
import { configurationQueryOptions } from "./configuration";
import { discoverQueryOptions } from "./discover";
import { genreQueryOptions } from "./genre";
import { queryKeys } from "./keys";
import { movieQueryOptions } from "./movie";
import { personQueryOptions } from "./person";
import { searchQueryOptions } from "./search";
import { trendingQueryOptions } from "./trending";
import { tvQueryOptions } from "./tv";

export {
    movieQueryOptions,
    tvQueryOptions,
    personQueryOptions,
    searchQueryOptions,
    discoverQueryOptions,
    trendingQueryOptions,
    genreQueryOptions,
    configurationQueryOptions,
    compositeQueryOptions,
    queryKeys,
};

export type * from "@/types/tmdb";
export type { MovieSortOption, TVSortOption } from "@/utils/sort-options";
export type { MediaType, TimeWindow } from "./trending";
