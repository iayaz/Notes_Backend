import Note from "../models/Notes.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const find = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
    if (!note) return res.status(404).json({ msg: "Not Found" });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content, user: req.user.id });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;
    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { title, content },
      { new: true }
    );
    if (!updatedNote) return res.status(404).json({ msg: "Note not found" });
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleted = async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!deletedNote) return res.status(404).json({ msg: "Note not found" });
    res.status(200).json(deletedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
