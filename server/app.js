const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const userRoutes = require("./src/routes/UserRoutes");
const scoreRoutes = require("./src/routes/ScoreRoutes");
const gameRoutes = require("./src/routes/GameRoutes");
const User = require("./src/models/User");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",

  // credentials: true,
};

app.use(cors(corsOptions));
//Routes
app.use(userRoutes);
app.use(scoreRoutes);
app.use(gameRoutes);

const DB_URI = process.env.DB_CONNECTION;
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to Mongo Database");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("The password is incorrect");
      }
    } else {
      res.json("No record existed");
    }
  });
});

app.post("/signup", (req, res) => {
  User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

// Server initialization
const port = process.env.PORT || 3500;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
