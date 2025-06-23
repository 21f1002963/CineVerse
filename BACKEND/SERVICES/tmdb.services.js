const axios = require('axios');

const TMDB_BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const tmdbAPI = axios.create({
    baseURL: TMDB_BASE_URL,
    headers: {
        "accept": "application/json",
        "Authorization": `Bearer ${TMDB_BEARER_TOKEN}`
    }
});

const TMDB_ENDPOINT = {
    // Movies
    nowPlayingMovies: "/movie/now_playing",
    popularMovies: "/movie/popular",
    topRatedMovies: "/movie/top_rated",
    upcomingMovies: "/movie/upcoming",
    trendingMovies: "/trending/movie/day",
    
    movieDetails: (id) => `/movie/${id}`,
    movieCredits: (id) => `/movie/${id}/credits`,
    movieImages: (id) => `/movie/${id}/images`,
    movieRecommendations: (id) => `/movie/${id}/recommendations`,
    movieSearch: "/search/movie",
    movieGenres: "/genre/movie/list",

    // TV Shows
    popularTvShows: "/tv/popular",
    topRatedTvShows: "/tv/top_rated",
    trendingTvShows: "/trending/tv/week",
    tvShowDetails: (id) => `/tv/${id}`,
    tvShowCredits: (id) => `/tv/${id}/credits`,
    tvShowImages: (id) => `/tv/${id}/images`,
    tvShowRecommendations: (id) => `/tv/${id}/recommendations`,
    tvShowSearch: "/search/tv",
    tvGenres: "/genre/tv/list",

    // Discover
    discoverMovies: "/discover/movie",
    discoverTvShows: "/discover/tv",
};

module.exports = {
    tmdbAPI,
    TMDB_ENDPOINT
};
