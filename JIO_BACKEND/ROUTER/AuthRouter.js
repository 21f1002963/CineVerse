const express = require('express');
const { body, validationResult } = require('express-validator');
const authRouter = express.Router();

const { signUpHandler, loginHandler, protectRouteMiddleWare, logoutHandler, profileHandler, forgetPasswordHandler, resetPasswordHandler } = require('../CONTROLLER/AuthenticationController.js');
// const rateLimit = require('express-rate-limit'); // Uncomment and configure for brute-force protection

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
authRouter.post(
  "/signup",
  [body('email').isEmail().normalizeEmail(), body('password').isLength({ min: 10 }).trim().escape()],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Invalid signup data', errors: errors.array() });
    }
    next();
  },
  signUpHandler
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Bad request
 */
authRouter.post(
  "/login",
  // rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }), // Uncomment and configure as needed
  [body('email').isEmail().normalizeEmail(), body('password').isLength({ min: 1 }).trim().escape()], // Allow any password length for login
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Invalid login data', errors: errors.array() });
    }
    console.log('Login route hit');
    next();
  },
  loginHandler
);

authRouter.get("/logout", logoutHandler);
authRouter.get("/profile", protectRouteMiddleWare, profileHandler);
authRouter.patch("/forgetPassword", forgetPasswordHandler);
authRouter.patch("/resetPassword", resetPasswordHandler);

module.exports = authRouter;