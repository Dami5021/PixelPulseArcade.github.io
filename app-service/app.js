const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const userRoutes = require("./src/routes/UserRoutes");
const scoreRoutes = require("./src/routes/ScoreRoutes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
  credentials: true,
};

//Routes
app.use(userRoutes);
app.use(scoreRoutes);

const DB_URI = process.env.DB_CONNECTION;
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to Mongo Database");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(cors(corsOptions));

// Server initialization
const port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
