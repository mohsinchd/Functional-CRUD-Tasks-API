const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  getAllNotes,
  createNote,
  getSingleNote,
  deleteNote,
  updateNote,
} = require("../controllers/notesControllers");
const router = express.Router();

router.route("/").get(auth, getAllNotes);
router.route("/").post(auth, createNote);
router
  .route("/:id")
  .get(auth, getSingleNote)
  .delete(auth, deleteNote)
  .put(auth, updateNote);

module.exports = router;
