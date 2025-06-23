const { tmdbAPI, TMDB_ENDPOINT } = require("../SERVICES/tmdb.services");

const getPopular = async (req, res) => {
    try {
        const { data } = await tmdbAPI.get(TMDB_ENDPOINT.popularMovies);
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getPopular:", err);
        res.status(500).json({ message: "Failed to fetch popular movies", status: "failure" });
    }
}

const getTopRated = async (req, res) => {
    try {
        const { data } = await tmdbAPI.get(TMDB_ENDPOINT.topRatedMovies);
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getTopRated movies:", err);
        res.status(500).json({ message: "Failed to fetch top rated movies", status: "failure" });
    }
}

const getUpcoming = async (req, res) => {
    try {
        const { data } = await tmdbAPI.get(TMDB_ENDPOINT.upcomingMovies);
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getUpcoming movies:", err);
        res.status(500).json({ message: "Failed to fetch upcoming movies", status: "failure" });
    }
}

const getNowPlaying = async (req, res) => {
    try {
        const { data } = await tmdbAPI.get(TMDB_ENDPOINT.nowPlayingMovies);
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getNowPlaying movies:", err);
        res.status(500).json({ message: "Failed to fetch now playing movies", status: "failure" });
    }
}

const getMovieDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = await tmdbAPI.get(TMDB_ENDPOINT.movieDetails(id));
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getMovieDetails:", err);
        res.status(500).json({ message: "Failed to fetch movie details", status: "failure" });
    }
}

module.exports = {
    getPopular,
    getTopRated,
    getUpcoming,
    getNowPlaying,
    getMovieDetails
}; 