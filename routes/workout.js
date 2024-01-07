const express = require("express");
const router = express.Router();
const WorkoutController = require("../controllers/workoutController");

router.post(
  "/workouts",
  WorkoutController.addWorkoutToTrainingProgram
);

// router.get(
//   "/workouts",
//   WorkoutController.get...
// );

module.exports = router;
