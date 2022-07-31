const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userControllers");

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(auth, getMe);

module.exports = router;
