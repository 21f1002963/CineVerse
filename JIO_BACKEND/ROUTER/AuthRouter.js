const express = require('express');
const authRouter = express.Router();

const { signUpHandler, loginHandler, protectRouteMiddleWare, logoutHandler, profileHandler,
 } = require('../CONTROLLER/AuthenticationController.js');

authRouter.post("/signup", signUpHandler)
.post("/login", loginHandler)
.get("/logout", logoutHandler)
.get("/profile", protectRouteMiddleWare, profileHandler)
.patch("/forgetPassword", forgetPasswordHandler)
.patch("/resetPassword", resetPasswordHandler)

module.exports = authRouter;