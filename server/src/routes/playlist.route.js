import express from "express";
import {
  getAllPlaylist,
  addPlaylist,
  updatePlaylist,
  deletePlaylist,
  getPlaylistDetails,
} from "../controllers/playlist.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { createPlaylistSchema, updatePlaylistSchema } from "../validations/playlist.validation.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated, getAllPlaylist);
router.get("/:id", isAuthenticated, getPlaylistDetails);
router.post("/add",  isAuthenticated, validate(createPlaylistSchema), addPlaylist);
router.put("/update/:id", isAuthenticated, validate(updatePlaylistSchema), updatePlaylist);
router.delete("/delete/:id", isAuthenticated, deletePlaylist);


export default router;
