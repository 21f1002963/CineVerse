const express = require('express');
const router = express.Router();
const {
    getPopular,
    getTopRated,
    getUpcoming,
    getNowPlaying,
    getMovieDetails
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
router.get('/action', (req, res) => {
  res.json({ message: 'Action movies endpoint is working!' });
});

// Comedy
router.get('/comedy', (req, res) => {
  res.json({ message: 'Comedy movies endpoint is working!' });
});

// Horror
router.get('/horror', (req, res) => {
  res.json({ message: 'Horror movies endpoint is working!' });
});

// Romance
router.get('/romance', (req, res) => {
  res.json({ message: 'Romance movies endpoint is working!' });
});

// Anime
router.get('/anime', (req, res) => {
  res.json({ message: 'Anime movies endpoint is working!' });
});

// Movie Details
router.get('/:id', getMovieDetails);

module.exports = router;
