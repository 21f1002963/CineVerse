const { tmdbAPI, TMDB_ENDPOINT } = require("../SERVICES/tmdb.services");

const getPopular = async (req, res) => {
    try {
        const { data } = await tmdbAPI.get(TMDB_ENDPOINT.popularTvShows);
        res.status(200).json({ status: "success", data });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch popular TV shows", status: "failure" });
    }
}

const getTopRated = async (req, res) => {
    try {
        const { data } = await tmdbAPI.get(TMDB_ENDPOINT.topRatedTvShows);
        res.status(200).json({ status: "success", data });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch top rated TV shows", status: "failure" });
    }
}

const getTvShowDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = await tmdbAPI.get(TMDB_ENDPOINT.tvShowDetails(id));
        res.status(200).json({ status: "success", data });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch TV show details", status: "failure" });
    }
}

// Genre-specific TV show controllers
const getActionTvShows = async (req, res) => {
    try {
        const { data } = await tmdbAPI.get(`${TMDB_ENDPOINT.discoverTvShows}?with_genres=10759&sort_by=popularity.desc`);
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getActionTvShows:", err);
        res.status(500).json({ message: "Failed to fetch action TV shows", status: "failure" });
    }
}

const getComedyTvShows = async (req, res) => {
    try {
        const { data } = await tmdbAPI.get(`${TMDB_ENDPOINT.discoverTvShows}?with_genres=35&sort_by=popularity.desc`);
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getComedyTvShows:", err);
        res.status(500).json({ message: "Failed to fetch comedy TV shows", status: "failure" });
    }
}

const getCrimeTvShows = async (req, res) => {
    try {
        const { data } = await tmdbAPI.get(`${TMDB_ENDPOINT.discoverTvShows}?with_genres=80&sort_by=popularity.desc`);
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getCrimeTvShows:", err);
        res.status(500).json({ message: "Failed to fetch crime TV shows", status: "failure" });
    }
}

const getDramaTvShows = async (req, res) => {
    try {
        const { data } = await tmdbAPI.get(`${TMDB_ENDPOINT.discoverTvShows}?with_genres=18&sort_by=popularity.desc`);
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getDramaTvShows:", err);
        res.status(500).json({ message: "Failed to fetch drama TV shows", status: "failure" });
    }
}

const getMysteryTvShows = async (req, res) => {
    try {
        const { data } = await tmdbAPI.get(`${TMDB_ENDPOINT.discoverTvShows}?with_genres=9648&sort_by=popularity.desc`);
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getMysteryTvShows:", err);
        res.status(500).json({ message: "Failed to fetch mystery TV shows", status: "failure" });
    }
}

module.exports = {
    getPopular,
    getTopRated,
    getTvShowDetails,
    getActionTvShows,
    getComedyTvShows,
    getCrimeTvShows,
    getDramaTvShows,
    getMysteryTvShows
}; 