const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register New User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Include all fields");
  }

  // Check if user already exists

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  }

  // Hash Password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create New User

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    return res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user Data.");
  }
});

// Login User

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email & Password are Required");
  }

  //   Check if User present or not

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("Bad User Credentials");
  }

  //   Check if password correct or not

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    res.status(400);
    throw new Error("Bad User Credentials. Incorrect Email or Password");
  }

  //   return User
  res.status(200).json({
    id: user._id,
    email: user.email,
    name: user.name,
    token: generateToken(user._id),
  });
});

// Get Me

const getMe = asyncHandler(async (req, res) => {
  const user = {
    name: res.user.name,
    id: res.user._id,
    email: res.user.email,
  };

  res.status(200).json(user);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
