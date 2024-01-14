const express = require("express");
const router = express.Router();
const exerciseController = require("../controllers/exerciseController");

router.post("/exercises", exerciseController.createExerciseAndAddToWorkout);

router.get("/exercises/:workoutId", exerciseController.getExercisesInWorkout);

router.delete(
  "/exercises/:workoutId/:exerciseId",
  exerciseController.removeExerciseFromWorkout
);

module.exports = router;
