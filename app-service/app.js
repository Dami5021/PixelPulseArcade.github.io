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

app.use(cors(corsOptions));

const port = 3500;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
