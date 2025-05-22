const express = require('express');
const MovieRouter = express.Router();

import { getActionMovies, getHorrorMovies, getComedyMovies, getRomanceMovies, getAnimeMovies, getMovieDetails } from '../CONTROLLER/MovieController.js';

MovieRouter.get("/action", getActionMovies)
.get("/comedy", getComedyMovies)
.get("/horror", getHorrorMovies)
.get("/romance", getRomanceMovies)
.get("/anime", getAnimeMovies)
.get("/details", getMovieDetails)

module.exports = MovieRouter;
