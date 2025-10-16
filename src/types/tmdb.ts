export type Movie = {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genre_ids: number[];
    adult: boolean;
    video: boolean;
    original_language: string;
};

export interface MovieDetail extends Omit<Movie, "genre_ids"> {
    genres: Genre[];
    runtime: number | null;
    status: string;
    tagline: string | null;
    budget: number;
    revenue: number;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    spoken_languages: SpokenLanguage[];
    imdb_id: string | null;
    homepage: string | null;
    belongs_to_collection: Collection | null;
}

export type TVShow = {
    id: number;
    name: string;
    original_name: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genre_ids: number[];
    origin_country: string[];
    original_language: string;
};

export interface TVShowDetail extends Omit<TVShow, "genre_ids"> {
    genres: Genre[];
    created_by: Creator[];
    episode_run_time: number[];
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: Episode | null;
    next_episode_to_air: Episode | null;
    networks: Network[];
    number_of_episodes: number;
    number_of_seasons: number;
    seasons: Season[];
    status: string;
    type: string;
    tagline: string;
    homepage: string | null;
}

export type Person = {
    id: number;
    name: string;
    profile_path: string | null;
    known_for_department: string;
    popularity: number;
    gender: number;
    adult: boolean;
    known_for?: (Movie | TVShow)[];
};

export interface PersonDetail extends Person {
    biography: string;
    birthday: string | null;
    deathday: string | null;
    place_of_birth: string | null;
    also_known_as: string[];
    homepage: string | null;
    imdb_id: string | null;
}

export type CastMember = {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
    order: number;
    cast_id: number;
    credit_id: string;
    gender: number;
    known_for_department: string;
};

export type CrewMember = {
    id: number;
    name: string;
    job: string;
    department: string;
    profile_path: string | null;
    credit_id: string;
    gender: number;
};

export type Credits = {
    id: number;
    cast: CastMember[];
    crew: CrewMember[];
};

export type Video = {
    id: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    iso_639_1: string;
    iso_3166_1: string;
};

export type Videos = {
    id: number;
    results: Video[];
};

export type Image = {
    aspect_ratio: number;
    file_path: string;
    height: number;
    width: number;
    iso_639_1: string | null;
    vote_average: number;
    vote_count: number;
};

export type Images = {
    id: number;
    backdrops: Image[];
    posters: Image[];
    logos?: Image[];
};

export type Review = {
    id: string;
    author: string;
    author_details: {
        name: string;
        username: string;
        avatar_path: string | null;
        rating: number | null;
    };
    content: string;
    created_at: string;
    updated_at: string;
    url: string;
};

export type Genre = {
    id: number;
    name: string;
};

export type ProductionCompany = {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
};

export type ProductionCountry = {
    iso_3166_1: string;
    name: string;
};

export type SpokenLanguage = {
    english_name: string;
    iso_639_1: string;
    name: string;
};

export type Collection = {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
};

export type Season = {
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    episode_count: number;
    air_date: string | null;
};

export interface SeasonDetail extends Season {
    _id: string;
    episodes: Episode[];
}

export type Episode = {
    id: number;
    name: string;
    overview: string;
    still_path: string | null;
    episode_number: number;
    season_number: number;
    air_date: string | null;
    vote_average: number;
    vote_count: number;
    runtime: number | null;
    production_code: string;
    crew: CrewMember[];
    guest_stars: CastMember[];
};

export type Creator = {
    id: number;
    name: string;
    profile_path: string | null;
    credit_id: string;
    gender: number;
};

export type Network = {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
};

export type PaginatedResponse<T> = {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
};

export type SearchResult = {
    id: number;
    media_type: "movie" | "tv" | "person";
    title?: string;
    name?: string;
    poster_path?: string | null;
    profile_path?: string | null;
    backdrop_path?: string | null;
    release_date?: string;
    first_air_date?: string;
    overview?: string;
    known_for_department?: string;
    known_for?: (Movie | TVShow)[];
    vote_average?: number;
    popularity?: number;
};

export type MovieCredits = {
    id: number;
    cast: Array<
        Movie & { character: string; credit_id: string; order: number }
    >;
    crew: Array<Movie & { job: string; department: string; credit_id: string }>;
};

export type TVCredits = {
    id: number;
    cast: Array<
        TVShow & { character: string; credit_id: string; episode_count: number }
    >;
    crew: Array<
        TVShow & {
            job: string;
            department: string;
            credit_id: string;
            episode_count: number;
        }
    >;
};

export type DiscoverFilters = {
    type?: "movie" | "tv";
    genre?: number;
    year?: number;
    "vote_average.gte"?: number;
    "vote_average.lte"?: number;
    "vote_count.gte"?: number;
    with_genres?: string;
    with_companies?: string;
    with_keywords?: string;
    "release_date.gte"?: string;
    "release_date.lte"?: string;
    "first_air_date.gte"?: string;
    "first_air_date.lte"?: string;
    sort_by?: string;
    page?: number;
    language?: string;
    region?: string;
    include_adult?: boolean;
    include_video?: boolean;
    "with_runtime.gte"?: number;
    "with_runtime.lte"?: number;
};

export type Configuration = {
    images: {
        base_url: string;
        secure_base_url: string;
        backdrop_sizes: string[];
        logo_sizes: string[];
        poster_sizes: string[];
        profile_sizes: string[];
        still_sizes: string[];
    };
    change_keys: string[];
};
