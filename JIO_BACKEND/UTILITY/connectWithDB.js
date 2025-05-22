const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { DB_PASSWORD, DB_USERNAME } = process.env;
const dbURL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@jio-cinema.lzocot8.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(dbURL)
  .then(function (connection) {
    console.log("Connected to db");
  })
  .catch((err) => console.log(err));
