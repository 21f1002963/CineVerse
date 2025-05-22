const axios = require('axios');
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const imageBaseURL = 'https://image.tmdb.org/t/p/original/';

/**const headers = {
    accept: 'application/json',
    Authorization: `Bearer `+ process.env.TMDB_API_KEY
};
**/

const TMDB_ENDPOINT = {
    //Discover
    fetchNowPlaying: '/movie/now_playing', 
    fetchTrending: '/moive/trending',
    fetchUpcoming: '/movie/upcoming',
    fetchTopRated: "/movie/top_rated", 
    // Movies
    fetchActionMovies: "/discover/movie?with_genres=28",
    fetchComedyMovies: "/discover/movie?with_genres=35",
    fetchHorrorMovies: "/discover/movie?with_genres=27",
    fetchRomanticMovies: "/discover/movie?with_genres=10749",
    fetchAnimeMovies: "/discover/movie?with_genres=16",
    fetchMovieVideos: (id) => `/movie/${id}/videos`,
    fetchMovieDetails: (id) => `/movie/${id}`,
    //TvShows
    fetchActionTvShows: "/discover/tv?with_genres=10759",
    fetchComedyTvShows: "/discover/tv?with_genres=35",
    fetchMysteryTvShows: "/discover/tv?with_genres=9648",
    fetchDramaTvShows: "/discover/tv?with_genres=18",
    fetchCrimeTvShows: "/discover/tv?with_genres=80",
    fetchTvShowVideos: (id) => `/tv/${id}/videos`,
    fetchTvShowDetails: (id) => `/tv/${id}`,
}

const tmdbApi = axios.create({
    baseURL: BASE_URL,
});

tmdbApi.interceptors.request.use(function (config) {
    config.params = config.params || {};
    config.params["api_key"] = API_KEY;
    return config;
});

/**const tmdbAPI = {
    get: async (endpoint) => {
        const url = tmdbBASEURL + endpoint;
        const response = await fetch(url, 
            {
                method: 'GET',
                headers: headers});
    
        const data = await response.json();
        return data;
    }
}**/

module.exports = {
    tmdbAPI,
    TMDB_ENDPOINT
}