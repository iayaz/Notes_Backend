import express from "express";
import authMiddleware from "../middlewares/authMiddlewares.js";
import { getNotes, find, create, update ,deleted} from "../controllers/notes.js";
const router = express.Router();

//GET api/notes
router.get("/notes", authMiddleware, getNotes);

//GET api/notes/:id
router.get("/notes/:id", authMiddleware, find);

// POST api/notes
router.post("/notes", authMiddleware, create);

// PUT api/notes/:id
router.put("/notes/:id", authMiddleware, update);

// DELETE api/notes/:id
router.delete('/notes/:id',authMiddleware,deleted);

export default router;
