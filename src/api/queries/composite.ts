import { movieQueryOptions } from "./movie";
import { personQueryOptions } from "./person";
import { trendingQueryOptions } from "./trending";
import { tvQueryOptions } from "./tv";

export const compositeQueryOptions = {
    // Get all data needed for movie detail page
    movieDetailPage: (movieId: number) => ({
        detail: movieQueryOptions.detail(movieId),
        credits: movieQueryOptions.credits(movieId),
        videos: movieQueryOptions.videos(movieId),
        similar: movieQueryOptions.similar(movieId),
        recommendations: movieQueryOptions.recommendations(movieId),
        reviews: movieQueryOptions.reviews(movieId),
    }),

    // Get all data needed for TV detail page
    tvDetailPage: (tvId: number) => ({
        detail: tvQueryOptions.detail(tvId),
        credits: tvQueryOptions.credits(tvId),
        videos: tvQueryOptions.videos(tvId),
        similar: tvQueryOptions.similar(tvId),
        recommendations: tvQueryOptions.recommendations(tvId),
        reviews: tvQueryOptions.reviews(tvId),
    }),

    // Get all data needed for person detail page
    personDetailPage: (personId: number) => ({
        detail: personQueryOptions.detail(personId),
        movieCredits: personQueryOptions.movieCredits(personId),
        tvCredits: personQueryOptions.tvCredits(personId),
        images: personQueryOptions.images(personId),
    }),

    // Get all data needed for home page
    homePage: () => ({
        trendingMovies: trendingQueryOptions.movies("day"),
        trendingTV: trendingQueryOptions.tv("day"),
        popularMovies: movieQueryOptions.popular(),
        topRatedMovies: movieQueryOptions.topRated(),
        nowPlaying: movieQueryOptions.nowPlaying(),
    }),
};