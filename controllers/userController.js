const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
      password,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);

    const token = jwt.sign({userId: user._id}, "your-secret-key", {
      expiresIn: "1h"
    })
    
    res.status(200).json({ message: "Login successful", user, token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })

    if (!User) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({userId: user._id}, "your-secret-key", {
      expiresIn: "1h"
    })
    res.status(200).json({ message: "Login successful", user, token });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  createUser,
  loginUser
};
