const { Exercise } = require("../models/exercise");
const { Workout } = require("../models/workout");

const createExerciseAndAddToWorkout = async (req, res) => {
  try {
    const { workoutId, exerciseDetails } = req.body;

    const newExercise = new Exercise(exerciseDetails);
    const savedExercise = await newExercise.save();

    const workout = await Workout.findById(workoutId);

    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    workout.exercises.push(savedExercise._id);
    await workout.save();

    res.status(201).json(savedExercise);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getExercisesInWorkout = async (req, res) => {
  try {
    const { workoutId } = req.params;

    const workout = await Workout.findById(workoutId).populate("exercises");

    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    const exercises = workout.exercises;
    res.status(200).json(exercises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const removeExerciseFromWorkout = async (req, res) => {
  try {
    const { workoutId, exerciseId } = req.params;

    const workout = await Workout.findById(workoutId);

    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    const index = workout.exercises.indexOf(exerciseId);
    if (index !== -1) {
      const removedExerciseId = workout.exercises.splice(index, 1)[0];
      await workout.save();

      await Exercise.deleteOne({ _id: removedExerciseId });

      res
        .status(200)
        .json({
          message: "Exercise removed from workout and deleted successfully",
        });
    } else {
      res.status(404).json({ error: "Exercise not found in the workout" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createExerciseAndAddToWorkout,
  getExercisesInWorkout,
  removeExerciseFromWorkout,
};
