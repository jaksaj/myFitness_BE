const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const saltrunde = 10;
    const hashpassword = await bcrypt.hash(password, saltrunde)
    const newUser = new User({
      username,
      email,
      password: hashpassword,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ userId: savedUser._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", savedUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body.userData;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (await bcrypt.compare(password, user.password)){
      const token = jwt.sign({ userId: user._id }, "your-secret-key", {
        expiresIn: "1h",
      });
      res.status(200).json({ message: "Login successful", user, token });
    }
    
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  loginUser,
};
