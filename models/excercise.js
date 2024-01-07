const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    // Add other properties related to exercises
  },
  { collection: "exercises" }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = { Exercise };
