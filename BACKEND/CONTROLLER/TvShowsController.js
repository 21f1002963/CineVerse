const { tmdbAPI, TMDB_ENDPOINT } = require("../SERVICES/tmdb.services");
const { retryApiCall } = require("../UTILITY/apiUtils");

const getPopular = async (req, res) => {
    try {
        const { data } = await retryApiCall(() => tmdbAPI.get(TMDB_ENDPOINT.popularTvShows));
        if (data.results && Array.isArray(data.results)) {
            data.results = data.results.map((tv) => ({ ...tv, media_type: "tv" }));
        }
        res.status(200).json({ status: "success", data });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch popular TV shows", status: "failure" });
    }
}

const getTopRated = async (req, res) => {
    try {
        const { data } = await retryApiCall(() => tmdbAPI.get(TMDB_ENDPOINT.topRatedTvShows));
        if (data.results && Array.isArray(data.results)) {
            data.results = data.results.map((tv) => ({ ...tv, media_type: "tv" }));
        }
        res.status(200).json({ status: "success", data });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch top rated TV shows", status: "failure" });
    }
}

const getTvShowDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const tvShowDetailsPromise = retryApiCall(() => tmdbAPI.get(TMDB_ENDPOINT.tvShowDetails(id)));
        const tvShowVideosPromise = retryApiCall(() => tmdbAPI.get(TMDB_ENDPOINT.tvShowVideos(id)));

        const [tvShowDetailsResponse, tvShowVideosResponse] = await Promise.all([
            tvShowDetailsPromise,
            tvShowVideosPromise,
        ]);

        const tvShowDetails = tvShowDetailsResponse.data;
        const tvShowVideos = tvShowVideosResponse.data;

        const trailer = tvShowVideos?.results?.find(
            (video) => video.site === "YouTube" && video.type === "Trailer"
        );

        const data = {
            ...tvShowDetails,
            key: trailer ? trailer.key : tvShowVideos?.results?.[0]?.key,
        };

        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getTvShowDetails:", err.message);
        res.status(500).json({
            message: "Failed to fetch TV show details",
            status: "failure",
            error: err.message,
        });
    }
}

// Genre-specific TV show controllers
const getActionTvShows = async (req, res) => {
    try {
        const { data } = await retryApiCall(() => tmdbAPI.get(`${TMDB_ENDPOINT.discoverTvShows}?with_genres=10759&sort_by=popularity.desc`));
        if (data.results && Array.isArray(data.results)) {
            data.results = data.results.map((tv) => ({ ...tv, media_type: "tv" }));
        }
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getActionTvShows:", err.message);
        res.status(500).json({ message: "Failed to fetch action TV shows", status: "failure", error: err.message });
    }
}

const getComedyTvShows = async (req, res) => {
    try {
        const { data } = await retryApiCall(() => tmdbAPI.get(`${TMDB_ENDPOINT.discoverTvShows}?with_genres=35&sort_by=popularity.desc`));
        if (data.results && Array.isArray(data.results)) {
            data.results = data.results.map((tv) => ({ ...tv, media_type: "tv" }));
        }
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getComedyTvShows:", err.message);
        res.status(500).json({ message: "Failed to fetch comedy TV shows", status: "failure", error: err.message });
    }
}

const getCrimeTvShows = async (req, res) => {
    try {
        const { data } = await retryApiCall(() => tmdbAPI.get(`${TMDB_ENDPOINT.discoverTvShows}?with_genres=80&sort_by=popularity.desc`));
        if (data.results && Array.isArray(data.results)) {
            data.results = data.results.map((tv) => ({ ...tv, media_type: "tv" }));
        }
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getCrimeTvShows:", err.message);
        res.status(500).json({ message: "Failed to fetch crime TV shows", status: "failure", error: err.message });
    }
}

const getDramaTvShows = async (req, res) => {
    try {
        const { data } = await retryApiCall(() => tmdbAPI.get(`${TMDB_ENDPOINT.discoverTvShows}?with_genres=18&sort_by=popularity.desc`));
        if (data.results && Array.isArray(data.results)) {
            data.results = data.results.map((tv) => ({ ...tv, media_type: "tv" }));
        }
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getDramaTvShows:", err.message);
        res.status(500).json({ message: "Failed to fetch drama TV shows", status: "failure", error: err.message });
    }
}

const getMysteryTvShows = async (req, res) => {
    try {
        const { data } = await retryApiCall(() => tmdbAPI.get(`${TMDB_ENDPOINT.discoverTvShows}?with_genres=9648&sort_by=popularity.desc`));
        if (data.results && Array.isArray(data.results)) {
            data.results = data.results.map((tv) => ({ ...tv, media_type: "tv" }));
        }
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getMysteryTvShows:", err.message);
        res.status(500).json({ message: "Failed to fetch mystery TV shows", status: "failure", error: err.message });
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