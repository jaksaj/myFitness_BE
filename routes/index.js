const express = require("express");
const userRoutes = require("./user");
const trainingProgramRoutes = require("./trainingProgram");
const workoutRoutes = require("./workout");
const authenticateToken = require("./authMiddleware");

const router = express.Router();

router.use("/api", (req, res, next) => {
  console.log(req.originalUrl);
  console.log(req.body);
  if (!req.originalUrl.includes("/api/users")) {
    authenticateToken(req, res, next);
  } else {
    next();
  }
});

router.use("/api", userRoutes);
router.use("/api", trainingProgramRoutes);
router.use("/api", workoutRoutes);

module.exports = router;
