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

module.exports = {
    getPopular,
    getTopRated,
    getTvShowDetails
}; 