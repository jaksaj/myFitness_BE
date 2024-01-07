const { TrainingProgram } = require("../models/trainingProgram");
const { Workout } = require("../models/workout")

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
module.exports = {
  addWorkoutToTrainingProgram,
};
