const express = require('express');
const router = express.Router();
const {
    getPopular,
    getTopRated,
    getTvShowDetails,
    getActionTvShows,
    getComedyTvShows,
    getCrimeTvShows,
    getDramaTvShows,
    getMysteryTvShows
} = require('../CONTROLLER/TvShowsController');

// Example: TV Shows List
router.get('/', (req, res) => {
  res.json({ message: 'TV shows endpoint is working!' });
});

// Action
router.get('/action', getActionTvShows);

// Comedy
router.get('/comedy', getComedyTvShows);

// Crime
router.get('/crime', getCrimeTvShows);

// Drama
router.get('/drama', getDramaTvShows);

// Mystery
router.get('/mystery', getMysteryTvShows);

// Popular
router.get('/popular', getPopular);

// Top Rated
router.get('/top_rated', getTopRated);

// TV Show Details
router.get('/:id', getTvShowDetails);

module.exports = router;
