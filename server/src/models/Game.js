const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  type: { type: String, required: true },
  players: { type: String, required: true },
  description: { type: String, required: true },
  imageSource: { type: String, required: true },
});

module.exports = mongoose.model("Game", GameSchema);
