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
    try{
        const data = await tmdbAPI.get(TMDB_ENDPOINT.fetchTrending)
        res.status(200).json({ status: "success", data });
    } catch(err){
        res.status(500).json({ message: "Failed to fetch trending movies", status: "failure" });
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
    try{
        const data = await tmdbAPI.get(TMDB_ENDPOINT.fetchTopRated)
        res.status(200).json({ status: "success", data });
    } catch(err){
        res.status(500).json({ message: "Failed to fetch top rated movies", status: "failure" });
    }
}

module.exports ={
    getNowPlaying,
    getTrending,
    getUpcoming,
    getTopRated
}