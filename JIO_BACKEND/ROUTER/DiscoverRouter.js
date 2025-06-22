const express = require('express');
const router = express.Router();

// Example discover route
router.get('/', (req, res) => {
  res.json({ message: 'Discover route is working!' });
});

// Example: Top Rated Discover
router.get('/top_rated', (req, res) => {
  res.json({ message: 'Discover top rated endpoint is working!' });
});

// Example: Trending Discover
router.get('/trending', (req, res) => {
  res.json({ message: 'Discover trending endpoint is working!' });
});

module.exports = router;
