const Score = require("../models/Score");

const getScore = async (req, res) => {
  const { id } = req.params;
  try {
    const score = await Score.findById(id);
    res.status(200).json(score);
  } catch (error) {
    console.log("Error retrieving this score: ", error);
    res.status(500).json({ message: "Request failed" });
  }
};

const addScore = async (req, res) => {
  const { username, score, game, date } = req.body;
  const newScore = new Score({ username, score, game, date });
  try {
    const savedScore = await newScore.save();
    res.status(201).json(savedScore);
  } catch (error) {
    console.error("Error adding score: ", error);
    res.status(500).json({ message: "Request failed" });
  }
};

const getHighScores = async (req, res) => {
  const { game } = req.params;
  const limit = 10;
  try {
    const scores = await Score.find({ game }).sort({ score: -1 }).limit(limit);
    res.status(200).json(scores);
  } catch (error) {
    console.error("Error fetching high scores: ", error);
    res.status(500).json({ message: "Request failed" });
  }
};

const updateHighScore = async (req, res) => {
  const { id } = req.params;
  const { score } = req.body;
  try {
    const updatedScore = await Score.findByIdAndUpdate(
      id,
      { score },
      { new: true }
    );
    res.status(200).json(updatedScore);
  } catch (error) {
    console.error("Error updating score: ", error);
    res.status(500).json({ message: "Request failed" });
  }
};

const getGameScores = async (req, res) => {
  const { game } = req.params;
  try {
    const scores = await Score.find({ game });
    res.status(200).json(scores);
  } catch (error) {
    console.error("Error fetching scores: ", error);
    res.status(500).json({ message: "Request failed" });
  }
};

const getUserScores = async (req, res) => {
  const { username } = req.params;
  try {
    const scores = await Score.find({ username });
    res.status(200).json(scores);
  } catch (error) {
    console.error("Error fetching scores: ", error);
    res.status(500).json({ message: "Request failed" });
  }
};

module.exports = {
  getScore,
  addScore,
  getHighScores,
  updateHighScore,
  getGameScores,
  getUserScores,
};
