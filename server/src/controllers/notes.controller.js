const notesCtrl = {};

const Note = require("../models/note.model");

notesCtrl.getNotes = async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
};

notesCtrl.getNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.json(note);
};

notesCtrl.createNote = async (req, res) => {
  const { title, note, author } = req.body;
  const newNote = new Note({
    title,
    note,
    author,
  });
  console.log(newNote);
  await newNote.save();
  res.json({ message: "note created" });
};

notesCtrl.updateNote = async (req, res) => {
  const { title, note, author } = req.body;
  await Note.findByIdAndUpdate(req.params.id, {
    title,
    note,
    author,
  });
  res.json("Note Updated");
};

notesCtrl.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json("note deleted");
};

module.exports = notesCtrl;
