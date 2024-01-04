import Note from "../models/Notes.js";
import SharedNote from "../models/sharedNote.js";
import User from "../models/User.js" 

export const getNotes = async (req, res) => {
  try {
    // Retrieve both the notes owned by the user and the notes shared with the user
    const notes = await Note.find({
      $or: [{ user: req.user.id }, { sharedWith: req.user.id }],
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const find = async (req, res) => {
  try {
    // Retrieve a note by ID owned by the user or shared with the user
    const note = await Note.findOne({
      _id: req.params.id,
      $or: [{ user: req.user.id }, { sharedWith: req.user.id }],
    });
    if (!note) return res.status(404).json({ msg: "Not Found" });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const { title, content } = req.body;
    // Create a new note owned by the user
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
    // Update a note by ID owned by the user
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
    // Delete a note by ID owned by the user
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

export const search = async (req, res) => {
  try {
    const query = req.query.q;
    // Search for notes based on keywords owned by the user or shared with the user
    const searchRes = await Note.find({
      $and: [
        {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { content: { $regex: query, $options: "i" } },
          ],
        },
        { $or: [{ user: req.user.id }, { sharedWith: req.user.id }] },
      ],
    });
    res.json(searchRes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const share = async (req, res) => {
  try {
    const { sharedWithUserId } = req.body;
    const noteId = req.params.id;
    
    // Check if the note exists and belongs to the authenticated user
    const note = await Note.findOne({ _id: noteId, user: req.user.id });
    if (!note) {
      return res.status(404).json({ msg: "Note not found" });
    }
    
    // Check if the user to share with exists
    // console.log("working fine");
    const sharedWithUser = await User.findById(sharedWithUserId);
    if (!sharedWithUser) {
      return res.status(404).json({ msg: "User to share with not found" });
    }

    // Check if the note is already shared with the user
    if (note.sharedWith.includes(sharedWithUserId)) {
      return res
        .status(400)
        .json({ msg: "Note already shared with this user" });
    }

    // Add the user ID to the sharedWith array
    note.sharedWith.push(sharedWithUserId);
    await note.save();

    // Create a record in the SharedNote model
    const sharedNote = new SharedNote({
      note: noteId,
      sharedWith: sharedWithUserId,
    });
    await sharedNote.save();

    res.status(201).json({ msg: "Note shared successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
