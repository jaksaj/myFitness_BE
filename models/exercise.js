const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    reps: { type: Number, default: 0 },
    sets: { type: Number, default: 0 },
  },
  { collection: "exercises" }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = { Exercise };
