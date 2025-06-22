const express = require('express');
const router = express.Router();

// Example stream route
router.get('/', (req, res) => {
  res.json({ message: 'Stream route is working!' });
});

module.exports = router;
