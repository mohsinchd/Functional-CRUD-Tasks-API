const Note = require("../models/NotesModel");
const asyncHandler = require("express-async-handler");

// Create New Note

const createNote = asyncHandler(async (req, res) => {
  const { note } = req.body;

  if (!note) {
    res.status(400);
    throw new Error("Please include note first");
  }

  const newNote = await Note.create({
    note,
    user: res.user.id,
  });

  res.status(201).json(newNote);
});

// Get all Notes
const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: res.user.id });
  res.status(200).json(notes);
});

// Get single Note

const getSingleNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(400);
    throw new Error("Ticket Not found");
  }

  res.status(200).json(note);
});

// Delete Note

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) {
    res.status(400);
    throw new Error("Ticket Not found");
  }

  await note.remove();

  res.status(200).json({ success: true, message: "Deleted Successfully" });
});

//update Note

const updateNote = asyncHandler(async (req, res) => {
  const { note } = req.body;

  if (!note) {
    res.status(400);
    throw new Error("Please include a note to update");
  }

  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedNote);
});

module.exports = {
  getAllNotes,
  createNote,
  getSingleNote,
  deleteNote,
  updateNote,
};
