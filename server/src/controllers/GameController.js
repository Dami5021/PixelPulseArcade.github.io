const Game = require("../models/Game");

const getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    console.error("Error fetching games: ", error);
    res.status(500).json({ message: "Request failed" });
  }
};

const getGameById = async (req, res) => {
  const { id } = req.params;
  try {
    const game = await Game.findById(id);
    if (!game) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(game);
  } catch (error) {
    console.error("Error fetching game: ", error);
    res.status(500).json({ message: "Request failed" });
  }
};

const getGameByName = async (req, res) => {
  try {
    const { name } = req.params;
    const game = await Game.findOne({ name });
    res.status(200).json(game);
  } catch (error) {
    console.error("Error fetching game: ", error);
    res.status(500).json({ message: "Request failed" });
  }
};

module.exports = { getGames, getGameById, getGameByName };
