const { response } = require("express");
const { tmdbAPI, TMDB_ENDPOINT } = require("../SERVICES/tmdb.services");

const getNowPlaying = async (req, res) => {
    try{
        const data = await tmdbAPI.get(TMDB_ENDPOINT.fetchNowPlaying)
        res.status(200).json({ status: "success", data });
    } catch(err){
        res.status(500).json({ message: "Failed to fetch now playing movies", status: "failure" });
    }
}

const getTrending = async (req, res) => {
    try {
        const { media_type } = req.params;
        const endpoint = media_type === 'movie' ? TMDB_ENDPOINT.trendingMovies : TMDB_ENDPOINT.trendingTvShows;
        const { data } = await tmdbAPI.get(endpoint);
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getTrending:", err);
        res.status(500).json({ message: "Failed to fetch trending", status: "failure" });
    }
}

const getUpcoming = async (req, res) => {
    try{
        const data = await tmdbAPI.get(TMDB_ENDPOINT.fetchUpcoming)
        res.status(200).json({ status: "success", data });
    } catch(err){
        res.status(500).json({ message: "Failed to fetch upcoming movies", status: "failure" });
    }
}

const getTopRated = async (req, res) => {
    try {
        const { media_type } = req.params;
        const endpoint = media_type === 'movie' ? TMDB_ENDPOINT.topRatedMovies : TMDB_ENDPOINT.topRatedTvShows;
        const { data } = await tmdbAPI.get(endpoint);
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getTopRated:", err);
        res.status(500).json({ message: "Failed to fetch top rated", status: "failure" });
    }
}

const getGenres = async (req, res) => {
    try {
        const { media_type } = req.params;
        const endpoint = media_type === 'movie' ? TMDB_ENDPOINT.movieGenres : TMDB_ENDPOINT.tvGenres;
        const { data } = await tmdbAPI.get(endpoint);
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getGenres:", err);
        res.status(500).json({ message: "Failed to fetch genres", status: "failure" });
    }
}

const getPopular = async (req, res) => {
    try {
        const { media_type } = req.params;
        const endpoint = media_type === 'movie' ? TMDB_ENDPOINT.popularMovies : TMDB_ENDPOINT.popularTvShows;
        const { data } = await tmdbAPI.get(endpoint);
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getPopular:", err);
        res.status(500).json({ message: "Failed to fetch popular", status: "failure" });
    }
}

module.exports = {
    getNowPlaying,
    getTrending,
    getUpcoming,
    getTopRated,
    getGenres,
    getPopular
}