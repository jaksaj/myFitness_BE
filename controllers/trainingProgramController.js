const { TrainingProgram } = require("../models/trainingProgram");

const createTrainingProgram = async (req, res) => {
  try {
    const { userId, name, type } = req.body;

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

module.exports = {
  createTrainingProgram,
};
