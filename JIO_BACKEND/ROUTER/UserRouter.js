const express = require('express');
const userRouter = express.Router();

const { createUser, getAllUsers, getUserById, deleteUserById, getCurrentUser, getUserWishlist, addToWishlist} = require('../CONTROLLER/UserController.js');
const { protectRouteMiddleWare, isAdminMiddleWare } = require('../CONTROLLER/AuthenticationController.js');


userRouter.use(protectRouteMiddleWare)
.get("/", getCurrentUser)
.post("/wishlist", addToWishlist)
.get("/wishlist", getUserWishlist)
.post("/", createUser)
.get("/All", protectRouteMiddleWare, isAdminMiddleWare, getAllUsers)
.get("/:id", getUserById)
.delete("/:id", protectRouteMiddleWare, deleteUserById);

module.exports = userRouter;