const { tmdbAPI, TMDB_ENDPOINT } = require("../SERVICES/tmdb.services");
const { retryApiCall } = require("../UTILITY/apiUtils");

const getPopular = async (req, res) => {
    try {
        const { data } = await retryApiCall(() => tmdbAPI.get(TMDB_ENDPOINT.popularMovies));
        if (data.results && Array.isArray(data.results)) {
            data.results = data.results.map((movie) => ({ ...movie, media_type: "movie" }));
        }
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getPopular:", err);
        res.status(500).json({ message: "Failed to fetch popular movies", status: "failure" });
    }
}

const getTopRated = async (req, res) => {
    try {
        const { data } = await retryApiCall(() => tmdbAPI.get(TMDB_ENDPOINT.topRatedMovies));
        if (data.results && Array.isArray(data.results)) {
            data.results = data.results.map((movie) => ({ ...movie, media_type: "movie" }));
        }
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getTopRated movies:", err);
        res.status(500).json({ message: "Failed to fetch top rated movies", status: "failure" });
    }
}

const getUpcoming = async (req, res) => {
    try {
        const { data } = await retryApiCall(() => tmdbAPI.get(TMDB_ENDPOINT.upcomingMovies));
        if (data.results && Array.isArray(data.results)) {
            data.results = data.results.map((movie) => ({ ...movie, media_type: "movie" }));
        }
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getUpcoming movies:", err);
        res.status(500).json({ message: "Failed to fetch upcoming movies", status: "failure" });
    }
}

const getNowPlaying = async (req, res) => {
    try {
        const { data } = await retryApiCall(() => tmdbAPI.get(TMDB_ENDPOINT.nowPlayingMovies));
        if (data.results && Array.isArray(data.results)) {
            data.results = data.results.map((movie) => ({ ...movie, media_type: "movie" }));
        }
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getNowPlaying movies:", err);
        res.status(500).json({ message: "Failed to fetch now playing movies", status: "failure" });
    }
}

const getMovieDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const movieDetailsPromise = retryApiCall(() => tmdbAPI.get(TMDB_ENDPOINT.movieDetails(id)));
        const movieVideosPromise = retryApiCall(() => tmdbAPI.get(TMDB_ENDPOINT.movieVideos(id)));

        const [movieDetailsResponse, movieVideosResponse] = await Promise.all([
            movieDetailsPromise,
            movieVideosPromise,
        ]);

        const movieDetails = movieDetailsResponse.data;
        const movieVideos = movieVideosResponse.data;

        const trailer = movieVideos?.results?.find(
            (video) => video.site === "YouTube" && video.type === "Trailer"
        );

        const data = {
            ...movieDetails,
            key: trailer ? trailer.key : movieVideos?.results?.[0]?.key,
        };

        res.status(200).json({ status: "success", data: { results: [data] } });
    } catch (err) {
        console.error("Error in getMovieDetails:", err.message);
        res.status(500).json({
            message: "Failed to fetch movie details",
            status: "failure",
            error: err.message,
        });
    }
}

// Genre-specific movie controllers
const getActionMovies = async (req, res) => {
    try {
        const { data } = await retryApiCall(() => tmdbAPI.get(`${TMDB_ENDPOINT.discoverMovies}?with_genres=28&sort_by=popularity.desc`));
        if (data.results && Array.isArray(data.results)) {
            data.results = data.results.map((movie) => ({ ...movie, media_type: "movie" }));
        }
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getActionMovies:", err);
        res.status(500).json({ message: "Failed to fetch action movies", status: "failure" });
    }
}

const getComedyMovies = async (req, res) => {
    try {
        const { data } = await retryApiCall(() => tmdbAPI.get(`${TMDB_ENDPOINT.discoverMovies}?with_genres=35&sort_by=popularity.desc`));
        if (data.results && Array.isArray(data.results)) {
            data.results = data.results.map((movie) => ({ ...movie, media_type: "movie" }));
        }
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getComedyMovies:", err);
        res.status(500).json({ message: "Failed to fetch comedy movies", status: "failure" });
    }
}

const getHorrorMovies = async (req, res) => {
    try {
        const { data } = await retryApiCall(() => tmdbAPI.get(`${TMDB_ENDPOINT.discoverMovies}?with_genres=27&sort_by=popularity.desc`));
        if (data.results && Array.isArray(data.results)) {
            data.results = data.results.map((movie) => ({ ...movie, media_type: "movie" }));
        }
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getHorrorMovies:", err);
        res.status(500).json({ message: "Failed to fetch horror movies", status: "failure" });
    }
}

const getRomanceMovies = async (req, res) => {
    try {
        const { data } = await retryApiCall(() => tmdbAPI.get(`${TMDB_ENDPOINT.discoverMovies}?with_genres=10749&sort_by=popularity.desc`));
        if (data.results && Array.isArray(data.results)) {
            data.results = data.results.map((movie) => ({ ...movie, media_type: "movie" }));
        }
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getRomanceMovies:", err);
        res.status(500).json({ message: "Failed to fetch romance movies", status: "failure" });
    }
}

const getAnimeMovies = async (req, res) => {
    try {
        const { data } = await retryApiCall(() => tmdbAPI.get(`${TMDB_ENDPOINT.discoverMovies}?with_genres=16&sort_by=popularity.desc`));
        if (data.results && Array.isArray(data.results)) {
            data.results = data.results.map((movie) => ({ ...movie, media_type: "movie" }));
        }
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