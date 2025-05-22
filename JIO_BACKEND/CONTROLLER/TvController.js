const { tmdbAPI, TMDB_ENDPOINT } = require("../SERVICES/tmdb.services.js");

const getActionTvShows = async (req, res) => {
    try{
        const data = await tmdbAPI.get(TMDB_ENDPOINT.fetchActionTvShows);
        data.data.results.forEach((item) => {
            item["media_type"] = "tv";
        });
        res.status(200).json({
            status: "success",
            response: data.data
        });
    } catch(err){
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
}

const getComedyTvShows = async (req, res) => {
    try{
        const data = await tmdbAPI.get(TMDB_ENDPOINT.fetchActionTvShows);
        data.data.results.forEach((item) => {
            item["media_type"] = "tv";
        });
        res.status(200).json({
            status: "success",
            response: data.data
        });
    } catch(err){
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
}

const getMysteryTvShows = async (req, res) => {
    try{
        const data = await tmdbAPI.get(TMDB_ENDPOINT.fetchMysteryTvShows);
        data.data.results.forEach((item) => {
            item["media_type"] = "tv";
        });
        res.status(200).json({
            status: "success",
            response: data.data
        });
    } catch(err){
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
}

const getDramaTvShows = async (req, res) => {
    try{
        const data = await tmdbAPI.get(TMDB_ENDPOINT.fetchDramaTvShows);
        data.data.results.forEach((item) => {
            item["media_type"] = "tv";
        });
        res.status(200).json({
            status: "success",
            response: data.data
        });
    } catch(err){
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
}

const getCrimeTvShows = async (req, res) => {
    try{
        const data = await tmdbAPI.get(TMDB_ENDPOINT.fetchCrimeTvShows);
        data.data.results.forEach((item) => {
            item["media_type"] = "tv";
        });
        res.status(200).json({
            status: "success",
            response: data.data
        });
    } catch(err){
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
}

const getTvShowDetails = async (req, res) => {
    try{
        const { id } = req.query;
        if (!id) throw new Error("Video Id is not defined.");
        const data = await tmdbAPI.get(TMDB_ENDPOINT.fetchTvShowDetails(id));
        res.status(200).json({
            status: "success",
            response: data.data
        });
    } catch(err){
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
}

module.exports = {
    getActionTvShows,
    getComedyTvShows,
    getMysteryTvShows,
    getDramaTvShows,
    getCrimeTvShows,
    getTvShowDetails
}