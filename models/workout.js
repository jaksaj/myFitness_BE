const mongoose = require("mongoose");
const { WorkoutType } = require("../constants")
const workoutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
    type: {
      type: String,
      required: true,
      enum: Object.values(WorkoutType),
    },
  },
  { collection: "workouts" } 
);

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = { Workout };
