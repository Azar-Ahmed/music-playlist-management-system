import asyncHandler from '../middlewares/asyncHandler.middleware.js';
import {
  getAllPlaylistService,
  addPlaylistService,
  updatePlaylistService,
  deletePlaylistService,
  getPlaylistDetailService,
} from '../services/playlist.service.js';

// @desc    Get all playlist
export const getAllPlaylist = asyncHandler(async (req, res) => {
  const data = await getAllPlaylistService();
  res.status(200).json(data);
});

// @desc    Add a new playlist
export const addPlaylist = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const data = await addPlaylistService(req.body, userId, req.files?.image);
  res.status(201).json({ playlist: data });
});

// @desc    Update a playlist
export const updatePlaylist = asyncHandler(async (req, res) => {
  const data = await updatePlaylistService(
    req.params.id,
    req.body,
    req.files?.image
  );
  res.status(200).json({ playlist: data });
});

// @desc    Delete a playlist
export const deletePlaylist = asyncHandler(async (req, res) => {
  const data = await deletePlaylistService(req.params.id);
  res.status(200).json(data);
});

// @desc    Get single playlist details
export const getPlaylistDetails = asyncHandler(async (req, res) => {
  const data = await getPlaylistDetailService(req.params.id);
  res.status(200).json(data);
});

