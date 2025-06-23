const express = require('express');
const router = express.Router();
const { getTrending, getTopRated, getGenres, getPopular } = require('../CONTROLLER/DiscoverController');

// Example discover route
router.get('/', (req, res) => {
  res.json({ message: 'Discover route is working!' });
});

// Example: Top Rated Discover
router.get('/top_rated/:media_type', getTopRated);

// Example: Trending Discover
router.get('/trending/:media_type', getTrending);

// Example: Genres Discover
router.get('/genres/:media_type', getGenres);

// Example: Popular Discover
router.get('/popular/:media_type', getPopular);

module.exports = router;
