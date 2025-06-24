const { response } = require("express");
const { tmdbAPI, TMDB_ENDPOINT } = require("../SERVICES/tmdb.services");
const { retryApiCall } = require("../UTILITY/apiUtils");

// Helper function to retry API calls

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
        
        console.log(`Fetching trending ${media_type} from endpoint: ${endpoint}`);
        
        const { data } = await retryApiCall(() => tmdbAPI.get(endpoint));
        
        if (data.results && Array.isArray(data.results)) {
            data.results = data.results.map((item) => ({ ...item, media_type }));
        }

        console.log(`Successfully fetched trending ${media_type}, results count:`, data?.results?.length || 0);
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getTrending:", err);
        console.error("Error details:", {
            message: err.message,
            code: err.code,
            status: err.response?.status,
            statusText: err.response?.statusText
        });
        res.status(500).json({ 
            message: "Failed to fetch trending", 
            status: "failure",
            error: err.message 
        });
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
        
        console.log(`Fetching top rated ${media_type} from endpoint: ${endpoint}`);
        
        const { data } = await retryApiCall(() => tmdbAPI.get(endpoint));
        
        if (data.results && Array.isArray(data.results)) {
            data.results = data.results.map((item) => ({ ...item, media_type }));
        }
        
        console.log(`Successfully fetched top rated ${media_type}, results count:`, data?.results?.length || 0);
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getTopRated:", err);
        console.error("Error details:", {
            message: err.message,
            code: err.code,
            status: err.response?.status,
            statusText: err.response?.statusText
        });
        res.status(500).json({ 
            message: "Failed to fetch top rated", 
            status: "failure",
            error: err.message 
        });
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
        
        console.log(`Fetching popular ${media_type} from endpoint: ${endpoint}`);
        
        const { data } = await retryApiCall(() => tmdbAPI.get(endpoint));
        
        if (data.results && Array.isArray(data.results)) {
            data.results = data.results.map((item) => ({ ...item, media_type }));
        }

        console.log(`Successfully fetched popular ${media_type}, results count:`, data?.results?.length || 0);
        res.status(200).json({ status: "success", data });
    } catch (err) {
        console.error("Error in getPopular:", err);
        console.error("Error details:", {
            message: err.message,
            code: err.code,
            status: err.response?.status,
            statusText: err.response?.statusText
        });
        res.status(500).json({ 
            message: "Failed to fetch popular", 
            status: "failure",
            error: err.message 
        });
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