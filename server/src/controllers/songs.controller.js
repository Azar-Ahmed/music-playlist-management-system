import asyncHandler from '../middlewares/asyncHandler.middleware.js';
import {
  getAllSongsService,
  addSongService,
  removeSongService,
} from '../services/songs.service.js';

// @desc    Get all songs
// @route   GET /api/songs
export const getAllSongs = asyncHandler(async (req, res) => {
  const data = await getAllSongsService();
  res.status(200).json(data);
});

// @desc    Add a new songs
// @route   POST /api/songs
export const addSongToPlaylist = asyncHandler(async (req, res) => {
  const data = await addSongService(req.body, req.files?.image);
  res.status(201).json({
    message: 'Song added to playlist successfully',
    playlist: data,
  });
});

// @desc    Remove a song
// @route   POST /api/songs/remove
export const removeSongFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, songId } = req.body;

  const updatedPlaylist = await removeSongService(playlistId, songId);

  res.status(200).json({
    message: "Song removed from playlist successfully",
    playlist: updatedPlaylist,
  });
});