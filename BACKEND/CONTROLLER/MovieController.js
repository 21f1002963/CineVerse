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

// Genre-specific movie controllers
const getActionMovies = async (req, res) => {
    try {
        const { data } = await tmdbAPI.get(`${TMDB_ENDPOINT.discoverMovies}?with_genres=28&sort_by=popularity.desc`);
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getActionMovies:", err);
        res.status(500).json({ message: "Failed to fetch action movies", status: "failure" });
    }
}

const getComedyMovies = async (req, res) => {
    try {
        const { data } = await tmdbAPI.get(`${TMDB_ENDPOINT.discoverMovies}?with_genres=35&sort_by=popularity.desc`);
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getComedyMovies:", err);
        res.status(500).json({ message: "Failed to fetch comedy movies", status: "failure" });
    }
}

const getHorrorMovies = async (req, res) => {
    try {
        const { data } = await tmdbAPI.get(`${TMDB_ENDPOINT.discoverMovies}?with_genres=27&sort_by=popularity.desc`);
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getHorrorMovies:", err);
        res.status(500).json({ message: "Failed to fetch horror movies", status: "failure" });
    }
}

const getRomanceMovies = async (req, res) => {
    try {
        const { data } = await tmdbAPI.get(`${TMDB_ENDPOINT.discoverMovies}?with_genres=10749&sort_by=popularity.desc`);
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getRomanceMovies:", err);
        res.status(500).json({ message: "Failed to fetch romance movies", status: "failure" });
    }
}

const getAnimeMovies = async (req, res) => {
    try {
        const { data } = await tmdbAPI.get(`${TMDB_ENDPOINT.discoverMovies}?with_genres=16&sort_by=popularity.desc`);
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getAnimeMovies:", err);
        res.status(500).json({ message: "Failed to fetch anime movies", status: "failure" });
    }
}

module.exports = {
    getPopular,
    getTopRated,
    getUpcoming,
    getNowPlaying,
    getMovieDetails,
    getActionMovies,
    getComedyMovies,
    getHorrorMovies,
    getRomanceMovies,
    getAnimeMovies
}; 