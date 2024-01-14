const { TrainingProgram } = require("../models/trainingProgram");

const createTrainingProgram = async (req, res) => {
  try {
    const { name, type } = req.body;
    userId = req.userId;

    const newTrainingProgram = new TrainingProgram({
      userId,
      name,
      type,
    });

    const savedTrainingProgram = await newTrainingProgram.save();

    res.status(201).json(savedTrainingProgram);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTrainingProgramsForUser = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    const trainingPrograms = await TrainingProgram.find({ userId }).exec();

    res.status(200).json(trainingPrograms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTrainingProgram = async (req, res) => {
  try {
    const { trainingProgramId } = req.params;

    const deletedTrainingProgram = await TrainingProgram.findByIdAndDelete(
      trainingProgramId
    );

    if (!deletedTrainingProgram) {
      return res.status(404).json({ error: "Training program not found" });
    }

    res.status(200).json({ message: "Training program deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createTrainingProgram,
  getTrainingProgramsForUser,
  deleteTrainingProgram,
};
