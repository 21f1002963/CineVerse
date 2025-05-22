const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const helmet = require("helmet");
const jwt = require('jsonwebtoken');
const util = require('util');
const cookieParser = require('cookie-parser');
dotenv.config();

const { PORT } = process.env;
const SECRET_KEY = 'ASDFYWERSDF';
require('./UTILITY/connectWithDB');
const app = express();

const UserModel = require('./MODEL/UserModel');

const authRouter = require('./ROUTER/AuthRouter');
const userRouter = require('./ROUTER/UserRouter');
const MovieRouter = require('./ROUTER/MovieRouter');
const TvShowsRouter = require('./ROUTER/TvShowRouter');
const DiscoverRouter = require('./ROUTER/DiscoverRouter');
const PaymentRouter = require('./ROUTER/PaymentRouter');
const StreamRouter = require('./ROUTER/StreamRouter');

const corsConfig = {
    origin: true,
    credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/movies', MovieRouter);
app.use('/api/tvshows', TvShowsRouter);
app.use('/api/discover', DiscoverRouter);
app.use('/api/payment', PaymentRouter);
app.use('/api/video', StreamRouter);

app.use(function cb(req, res) {
    // response
    res.status(404).json({
      status: "Failure",
      message: "Route not found",
    });
});

app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
}); 

