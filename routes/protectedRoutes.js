import express from "express";
import authMiddleware from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.get("/", authMiddleware, (req, res) => {
  res.json({ msg: "Working fine" });
});

export default router;
