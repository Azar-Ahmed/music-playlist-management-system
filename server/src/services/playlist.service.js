import Playlist from "../models/playlist.model.js";
import { uploadImage, deleteImage } from "../utils/fileUpload.utils.js";
import CustomError from "../utils/customError.utils.js";

export const getAllPlaylistService = async () => {
  const playlists = await Playlist.find();
  return playlists;
};

export const addPlaylistService = async (playlistData, userId, file) => {
  const {
    name,
    description,
  } = playlistData;

  if (!file) throw new CustomError("Playlist image is required", 400);

  const existingPlaylist = await Playlist.findOne({ name });
  if (existingPlaylist) {
    throw new CustomError("Playlist with this name already exists", 409);
  }

  const { secure_url } = await uploadImage(file);

  const newPlaylist = await Playlist.create({
    image: secure_url,
    name,
    description,
    userId,
  });
  return newPlaylist;
};

export const updatePlaylistService = async (playlistId, updateData, file) => {
  const existingPlaylist = await Playlist.findById(playlistId);
  if (!existingPlaylist) {
    throw new CustomError("Playlist not found", 404);
  }

  let updatedImage = existingPlaylist.image;

  if (file) {
    if (existingPlaylist.image?.public_id) {
      await deleteImage(existingPlaylist.image.public_id);
    }
    const { secure_url } = await uploadImage(file);
    updatedImage = secure_url;
  }

  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      image: updatedImage,
      ...updateData,
    },
    { new: true }
  );

  return updatedPlaylist;
};

export const deletePlaylistService = async (playlistId) => {
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    throw new CustomError("Playlist not found", 404);
  }

  if (playlist.image?.public_id) {
    await deleteImage(playlist.image.public_id);
  }

  await Playlist.findByIdAndDelete(playlistId);
  return playlistId;
};

export const getPlaylistDetailService = async (playlistId) => {
  const playlist = await Playlist.findById(playlistId).populate("songs");
  
  if (!playlist) {
    throw new CustomError("Playlist not found", 404);
  }
  return playlist;
};
