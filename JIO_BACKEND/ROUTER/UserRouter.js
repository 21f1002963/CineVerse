const express = require('express');
const router = express.Router();
const { getCurrentUser, addToWishlist, getUserWishlist } = require('../CONTROLLER/UserController');
const { protectRouteMiddleWare } = require('../CONTROLLER/AuthenticationController');

// Get current user profile (returns guest if not authenticated)
router.get('/', async (req, res, next) => {
  try {
    await protectRouteMiddleWare(req, res, () => getCurrentUser(req, res));
  } catch (err) {
    // If not authenticated, return guest/default user
    return res.status(200).json({
      user: null,
      status: "guest"
    });
  }
});

// Get user wishlist
router.get('/wishlist', protectRouteMiddleWare, getUserWishlist);

// Add to wishlist
router.post('/wishlist', protectRouteMiddleWare, addToWishlist);

module.exports = router;
