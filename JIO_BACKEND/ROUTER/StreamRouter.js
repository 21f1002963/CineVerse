const express = require('express');
const VideoRouter = express.Router();
const { getVideoStream} = require("../controller/StreamController");
const { getAllVideos } = require("../controller/VideoController");

VideoRouter.get("/", getAllVideos)
.get("/watch", getVideoStream)

module.exports = VideoRouter;