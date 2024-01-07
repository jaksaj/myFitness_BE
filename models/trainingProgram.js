const mongoose = require("mongoose");
const { TrainingProgramType } = require("../constants");

const trainingProgramSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: Object.values(TrainingProgramType),
    },
    workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
  },
  { collection: "trainingPrograms" }
);

const TrainingProgram = mongoose.model(
  "TrainingProgram",
  trainingProgramSchema
);

module.exports = { TrainingProgram };
