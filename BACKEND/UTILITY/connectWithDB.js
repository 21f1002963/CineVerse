const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dbURL = process.env.MONGODB_URI;

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(function (connection) {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.error("DB connection error:", err);
    process.exit(1);
  });
