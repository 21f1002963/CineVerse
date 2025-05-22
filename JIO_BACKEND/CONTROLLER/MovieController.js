import { tmdbAPI, TMDB_ENDPOINT } from "../SERVICES/tmdb.services.js";

async function getActionMovies(req, res){
    try{
        const data = await tmdbAPI.get(TMDB_ENDPOINT.fetchActionMovies);
        res.status(200).json({
            status: "success",
            data: data.data
        }); 
    } catch(err){
        res.status(500).json({
            message: err.message,
            status: "failure"
        })
    }
}

async function getComedyMovies(req, res){
    try{
        const data = await tmdbAPI.get(TMDB_ENDPOINT.fetchComedyMovies);
        res.status(200).json({
            status: "success",
            data: data.data
        }); 
    } catch(err){
        res.status(500).json({
            message: err.message,
            status: "failure"
        })
    }
}

async function getHorrorMovies(req, res){
    try{
        const data = await tmdbAPI.get(TMDB_ENDPOINT.fetchHorrorMovies);
        res.status(200).json({
            status: "success",
            data: data.data
        }); 
    } catch(err){
        res.status(500).json({
            message: err.message,
            status: "failure"
        })
    }
}

async function getRomanceMovies(req, res){
    try{
        const data = await tmdbAPI.get(TMDB_ENDPOINT.fetchRomanceMovies);
        res.status(200).json({
            status: "success",
            data: data.data
        }); 
    } catch(err){
        res.status(500).json({
            message: err.message,
            status: "failure"
        })
    }
}

async function getAnimeMovies(req, res){
    try{
        const data = await tmdbAPI.get(TMDB_ENDPOINT.fetchAnimeMovies);
        res.status(200).json({
            status: "success",
            data: data.data
        }); 
    } catch(err){
        res.status(500).json({
            message: err.message,
            status: "failure"
        })
    }
}

async function getMovieDetails(req, res){
    try{
        const { id } = req.query;
        if(!id) throw new Error("VideoID is not defined")
        const details = await tmdbAPI.get(TMDB_ENDPOINT.fetchMovieVideos(id));
        res.status(200).json({
            status: "success",
            data: details.data
        }); 
    } catch(err){
        res.status(500).json({
            message: err.message,
            status: "failure"
        })
    }
}

export {
    getActionMovies,
    getComedyMovies,
    getHorrorMovies,
    getRomanceMovies,
    getAnimeMovies,
    getMovieDetails
}
