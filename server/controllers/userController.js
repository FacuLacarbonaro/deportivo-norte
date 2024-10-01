const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

//SignUp
exports.signUp = async (req, res) => {
  try {
    const { username, password } = req.body;
    //Check if are valid inputs

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Please Input Username and Password" });
    }

    //Check if User Exist in the DB
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "User Already exists" });
    }

    //Hash the user password

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //Save the User to the database
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: "User Created Successfully", newUser });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error creating User" });
  }
};

//Login

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    //Check if the Input fields are valid
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Please Input Username and Password." });
    }

    // Check If User Exist in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid Username" });
    }

    // Compare Passwords

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid Password." });
    }

    // Generate JWT Token

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.SECRET_KEY || "1234!@#%<{*&)",
      { expiresIn: "1h" }
    );

    return res
      .status(200)
      .json({ message: "Login Successful", data: user, token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error during login" });
  }
};

//Get all users for route protected

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error fetching all users" });
  }
};
