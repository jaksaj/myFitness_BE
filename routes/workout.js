const express = require("express");
const router = express.Router();
const WorkoutController = require("../controllers/workoutController");

router.post("/workouts", WorkoutController.addWorkoutToTrainingProgram);

router.delete(
  "/workouts/:trainingProgramId/:workoutId",
  WorkoutController.removeWorkoutFromTrainingProgram
);

router.get(
  "/workouts/:trainingProgramId",
  WorkoutController.getWorkoutsForTrainingProgram
);

module.exports = router;
