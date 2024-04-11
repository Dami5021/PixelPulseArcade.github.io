const Scores = require("../models/Scores");

const getScore = async (req, res) => {
  const { id } = req.params;
  try {
    const score = await Scores.findById(id);
    res.status(200).json(score);
  } catch (error) {
    console.log("Error retrieving this score: ", error);
    res.status(500).json({ message: "Request failed" });
  }
};

const addScore = async (req, res) => {
  const { username, score, game, date } = req.body;
  const newScore = new Scores({ username, score, game, date });
  try {
    const savedScore = await newScore.save();
    res.status(201).json(savedScore);
  } catch (error) {
    console.error("Error adding score: ", error);
    res.status(500).json({ message: "Request failed" });
  }
};

const getGameScores = async (req, res) => {
  const { game } = req.params;
  try {
    const scores = await Scores.find({ game: game });
    res.status(200).json(scores);
  } catch (error) {
    console.error("Error fetching scores: ", error);
    res.status(500).json({ message: "Request failed" });
  }
};

const getUsersScores = async (req, res) => {
  const { username } = req.params;
  try {
    const scores = await Scores.find({ username: username });
    res.status(200).json(scores);
  } catch (error) {
    console.error("Error fetching scores: ", error);
    res.status(500).json({ message: "Request failed" });
  }
};

module.exports = {
  getScore,
  addScore,
  getGameScores,
  getUsersScores,
};
