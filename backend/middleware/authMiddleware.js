const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");

const auth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token
      token = req.headers.authorization.split(" ")[1];
      // Verify token
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      // Set User
      res.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error.message);
      res.status(401);
      throw new Error("Authorization Denied");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("No Token! Authorization Failed");
  }
});

module.exports = auth;
