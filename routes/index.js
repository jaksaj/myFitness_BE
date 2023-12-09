const express = require("express");
const userRoutes = require("./user");
const trainingProgramRoutes = require("./trainingProgram");

const router = express.Router();

router.use("/api", userRoutes);
router.use("/api", trainingProgramRoutes);

module.exports = router;
