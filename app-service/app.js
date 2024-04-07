const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
  credentials: true,
};
app.get((req, res) => {
  res.send("Welcome to App-Service, connection is succesful!"); // Send a simple response
});

app.use(cors(corsOptions));

// Server initialization
const port = 3500;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
