const express = require("express");
const router = express.Router();
const gameController = require("../controllers/GameController");

// Game routes
router.get("/games", gameController.getGames);
router.get("/games/id/:id", gameController.getGameById);
router.get("/games/name/:name", gameController.getGameByName);

module.exports = router;
