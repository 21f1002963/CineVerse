const express = require('express');
const router = express.Router();
const {
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
} = require('../CONTROLLER/MovieController');

// Example movie route
router.get('/', (req, res) => {
  res.json({ message: 'Movie route is working!' });
});

// Now Playing
router.get('/now_playing', getNowPlaying);

// Popular
router.get('/popular', getPopular);

// Top Rated
router.get('/top_rated', getTopRated);

// Upcoming
router.get('/upcoming', getUpcoming);

// Action
router.get('/action', getActionMovies);

// Comedy
router.get('/comedy', getComedyMovies);

// Horror
router.get('/horror', getHorrorMovies);

// Romance
router.get('/romance', getRomanceMovies);

// Anime
router.get('/anime', getAnimeMovies);

// Movie Details
router.get('/:id', getMovieDetails);

module.exports = router;
