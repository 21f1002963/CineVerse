const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { body, validationResult } = require('express-validator');
dotenv.config();

const { PORT } = process.env;
require('./UTILITY/connectWithDB');
const app = express();

const UserModel = require('./MODEL/UserModel');

const authRouter = require('./ROUTER/AuthRouter');
const userRouter = require('./ROUTER/UserRouter');
const MovieRouter = require('./ROUTER/MovieRouter');
const TvShowsRouter = require('./ROUTER/TvShowsRouter');
const DiscoverRouter = require('./ROUTER/DiscoverRouter');
const PaymentRouter = require('./ROUTER/PaymentRouter');
const StreamRouter = require('./ROUTER/StreamRouter');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { protectRouteMiddleWare } = require('./CONTROLLER/AuthenticationController'); // Example import

const corsConfig = {
    origin: true,
    credentials: true,
};

// Use CORS with config only
app.use(cors(corsConfig));
app.use(morgan('dev'));
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

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'JioCinema API',
      version: '1.0.0',
      description: 'API documentation for JioCinema backend',
    },
    servers: [
      { url: 'http://localhost:' + PORT }
    ],
  },
  apis: ['./ROUTER/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(function (req, res, next) {
  res.status(404).json({
    status: "Failure",
    message: "Route not found",
  });
});

// Global error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    status: "Error",
    message: err.message || "Internal Server Error"
  });
});

app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
});

// Example: app.use('/api/user', protectRouteMiddleWare, userRouter); // Uncomment to protect all user routes

