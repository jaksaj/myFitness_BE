const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.post("/users", UserController.createUser);
router.post("/users", UserController.loginUser);
module.exports = router;
