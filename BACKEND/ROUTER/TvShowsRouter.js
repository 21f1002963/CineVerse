const express = require('express');
const router = express.Router();
const {
    getPopular,
    getTopRated,
    getTvShowDetails
} = require('../CONTROLLER/TvShowsController');

// Example: TV Shows List
router.get('/', (req, res) => {
  res.json({ message: 'TV shows endpoint is working!' });
});

// Action
router.get('/action', (req, res) => {
  res.json({ message: 'Action TV shows endpoint is working!' });
});
// Comedy
router.get('/comedy', (req, res) => {
  res.json({ message: 'Comedy TV shows endpoint is working!' });
});
// Crime
router.get('/crime', (req, res) => {
  res.json({ message: 'Crime TV shows endpoint is working!' });
});
// Drama
router.get('/drama', (req, res) => {
  res.json({ message: 'Drama TV shows endpoint is working!' });
});
// Mystery
router.get('/mystery', (req, res) => {
  res.json({ message: 'Mystery TV shows endpoint is working!' });
});
// TV Show Details
router.get('/:id', getTvShowDetails);

router.get('/popular', getPopular);
router.get('/top_rated', getTopRated);

module.exports = router;
