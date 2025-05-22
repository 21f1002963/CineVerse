const express = require('express');
const DiscoverRouter = express.Router();
import { getNowPlaying, getTrending, getUpcoming, getTopRated } from "../CONTROLLER/DiscoverController"

DiscoverRouter.get("/now_playing", getNowPlaying)
.get("/trending", getTrending)
.get("/upcoming", getUpcoming)
.get("/top_rated", getTopRated)

module.exports = DiscoverRouter
