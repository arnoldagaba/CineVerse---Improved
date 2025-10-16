import { useSuspenseQuery } from "@tanstack/react-query";
import {
    genreQueryOptions,
    movieQueryOptions,
    trendingQueryOptions,
} from "@/api/queries";
import { MovieCarousel } from "@/components/carousel/movie";
import { TVCarousel } from "@/components/carousel/tv";
import { GenreQuickAccess } from "@/components/genre/genre-quick-access";
import { MovieGrid } from "@/components/grid/movie";
import { CTA } from "@/components/section/cta";
import { SectionHeader } from "@/components/section/header";
import { HeroSection } from "@/components/section/hero";

export function HomePage() {
    const { data: trendingMovies } = useSuspenseQuery(
        trendingQueryOptions.movies("day")
    );
    const { data: trendingTV } = useSuspenseQuery(
        trendingQueryOptions.tv("day")
    );
    const { data: popularMovies } = useSuspenseQuery(
        movieQueryOptions.popular()
    );
    const { data: topRated } = useSuspenseQuery(movieQueryOptions.topRated());
    const { data: genres } = useSuspenseQuery(genreQueryOptions.movieList());

    const featuredMovie = trendingMovies.results[0];

    return (
        <div className="space-y-12 py-8">
            {/* Hero Section */}
            <HeroSection movie={featuredMovie} />

            {/* Trending Movies */}
            <section className="container mx-auto px-4">
                <SectionHeader
                    subtitle="Check out the most talked-about movies right now"
                    title="Trending Movies"
                    viewAllHref="/trending?type=movie&timeWindow=day"
                />
                
                <MovieCarousel movies={trendingMovies.results.slice(0, 10)} />
            </section>

            {/* Trending TV Shows */}
            <section className="container mx-auto px-4">
                <SectionHeader
                    subtitle="The hottest TV shows everyone is watching"
                    title="Trending TV Shows"
                    viewAllHref="/trending?type=tv&timeWindow=day"
                />
                <TVCarousel shows={trendingTV.results.slice(0, 10)} />
            </section>

            {/* Genre Quick Access */}
            <section className="container mx-auto px-4">
                <SectionHeader
                    subtitle="Find what you're in the mood for"
                    title="Browse by Genre"
                />
                <GenreQuickAccess genres={genres.genres} />
            </section>

            {/* Popular Now */}
            <section className="container mx-auto px-4">
                <SectionHeader
                    subtitle="What's popular this month"
                    title="Popular Now"
                    viewAllHref="/discover?sort=popularity.desc"
                />
                {/** biome-ignore lint/style/noMagicNumbers: <- Just ignore the lint error -> */}
                <MovieGrid movies={popularMovies.results.slice(0, 12)} />
            </section>

            {/* Top Rated */}
            <section className="container mx-auto px-4">
                <SectionHeader
                    subtitle="The best-rated movies of all time"
                    title="Top Rated Movies"
                    viewAllHref="/discover?sort=vote_average.desc"
                />
                <MovieCarousel movies={topRated.results.slice(0, 10)} />
            </section>

            {/* Call to Action */}
            <CTA />
        </div>
    );
}
