const mongoose = require("mongoose");

const ScoresSchema = new mongoose.Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
  game: { type: String, required: true },
  date: { type: Date, default: Date.now(), required: true },
});

module.exports = mongoose.model("Scores", ScoresSchema);
