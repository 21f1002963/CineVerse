const express = require('express');
const router = express.Router();
const { getCurrentUser, addToWishlist, getUserWishlist } = require('../CONTROLLER/UserController');
const { protectRouteMiddleWare } = require('../CONTROLLER/AuthenticationController');

// Get current user profile (returns guest if not authenticated)
router.get('/', async (req, res, next) => {
  try {
    const jwttoken = req.cookies.JWT;
    
    if(!jwttoken) {
      return res.status(401).json({
        message: 'Unauthorized user',
        status: "failure"
      });
    }

    // Use the protection middleware directly
    await protectRouteMiddleWare(req, res, () => getCurrentUser(req, res));
  } catch (err) {
    // If not authenticated, return 401
    return res.status(401).json({
      message: 'Unauthorized user',
      status: "failure"
    });
  }
});

// Get user wishlist
router.get('/wishlist', protectRouteMiddleWare, getUserWishlist);

// Add to wishlist
router.post('/wishlist', protectRouteMiddleWare, addToWishlist);

module.exports = router;
