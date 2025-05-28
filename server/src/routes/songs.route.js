import express from "express";
import {
  getAllSongs,
  addSongToPlaylist,
  removeSongFromPlaylist,
} from "../controllers/songs.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { createSongSchema } from "../validations/songs.validation.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated, getAllSongs);
router.post("/add",  isAuthenticated, validate(createSongSchema), addSongToPlaylist);
router.post("/remove", isAuthenticated, removeSongFromPlaylist);

export default router;
