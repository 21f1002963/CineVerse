const express = require('express');
const { body, sanitizeBody } = require('express-validator');
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
  signUpHandler
)
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
.post(
  "/login",
  // rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }), // Uncomment and configure as needed
  [body('email').isEmail().normalizeEmail(), body('password').isLength({ min: 10 }).trim().escape()],
  loginHandler
)
.get("/logout", logoutHandler)
.get("/profile", protectRouteMiddleWare, profileHandler)
.patch("/forgetPassword", forgetPasswordHandler)
.patch("/resetPassword", resetPasswordHandler)

module.exports = authRouter;