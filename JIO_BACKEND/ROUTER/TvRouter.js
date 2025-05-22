const express = require('express');
const TvShowsRouter = express.Router();

TvShowsRouter
.get("/action", getActionTvShows)
.get("/comedy", getComedyTvShows)
.get("/mystery", getMysteryTvShows)
.get("/drama", getDramaTvShows)
.get("/crime", getCrimeTvShows)
.get("/details", getTvShowDetails)

module.exports = TvShowsRouter;