const express = require("express");
const router = express.Router();
const TrainingProgramController = require("../controllers/trainingProgramController");

router.post(
  "/trainingPrograms",
  TrainingProgramController.createTrainingProgram
);

router.get(
  "/trainingPrograms",
  TrainingProgramController.getTrainingProgramsForUser
);

module.exports = router;
