const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    note: {
      type: String,
      required: [true, "Note is Required"],
      minLength: [5, "Note should be longer than 5 characters"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", NotesSchema);

module.exports = Note;
