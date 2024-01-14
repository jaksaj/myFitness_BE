const { TrainingProgram } = require("../models/trainingProgram");
const { Workout } = require("../models/workout");

const addWorkoutToTrainingProgram = async (req, res) => {
  try {
    const { trainingProgramId, workoutDetails } = req.body;

    const trainingProgram = await TrainingProgram.findById(trainingProgramId);

    if (!trainingProgram) {
      return res.status(404).json({ error: "Training program not found" });
    }

    const newWorkout = new Workout(workoutDetails);
    const savedWorkout = await newWorkout.save();

    trainingProgram.workouts.push(savedWorkout._id);
    await trainingProgram.save();

    res.status(200).json(trainingProgram);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const removeWorkoutFromTrainingProgram = async (req, res) => {
  try {
    const { trainingProgramId, workoutId } = req.params;

    const trainingProgram = await TrainingProgram.findById(trainingProgramId);

    if (!trainingProgram) {
      return res.status(404).json({ error: "Training program not found" });
    }

    const index = trainingProgram.workouts.indexOf(workoutId);
    if (index !== -1) {
      const removedWorkoutId = trainingProgram.workouts.splice(index, 1)[0];
      await trainingProgram.save();

      await Workout.deleteOne({ _id: removedWorkoutId });

      res.status(200).json(trainingProgram);
    } else {
      res
        .status(404)
        .json({ error: "Workout not found in the training program" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getWorkoutsForTrainingProgram = async (req, res) => {
  try {
    const { trainingProgramId } = req.params;

    const trainingProgram = await TrainingProgram.findById(
      trainingProgramId
    ).populate("workouts");

    if (!trainingProgram) {
      return res.status(404).json({ error: "Training program not found" });
    }

    const workouts = trainingProgram.workouts;
    res.status(200).json(workouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addWorkoutToTrainingProgram,
  removeWorkoutFromTrainingProgram,
  getWorkoutsForTrainingProgram,
};
