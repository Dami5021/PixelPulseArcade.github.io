const express = require("express");
const router = express.Router();
const scoreController = require("../controllers/ScoresController");

// Score routes
router.get("/scores/id/:id", scoreController.getScore);
router.post("/scores", scoreController.addScore);
router.get("/scores/game/:game", scoreController.getGameScores);
router.get("/scores/username/:username", scoreController.getUsersScores);

module.exports = router;
