import Playlist from '../models/playlist.model.js';
import Song from '../models/song.model.js';
import { uploadImage } from '../utils/fileUpload.utils.js';
import CustomError from '../utils/customError.utils.js';

export const getAllSongsService = async () => {
  const songs = await Song.find();
  return songs;
};

export const addSongService = async (songData) => {
  const { playlistId, spotifyId, title, artist, album, image } = songData;
console.log(image)
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) throw new CustomError("Playlist not found", 404);


  let song = await Song.findOne({ spotifyId });
  if (!song) {
    song = await Song.create({
      spotifyId,
      image,
      title,
      artist,
      album,
    });
  }

  // Avoid duplicates
  const alreadyInPlaylist = playlist.songs.includes(song._id);
  if (!alreadyInPlaylist) {
    playlist.songs.push(song._id);
    await playlist.save();
  }

  // Return updated playlist (optionally populated)
  const updatedPlaylist = await Playlist.findById(playlistId).populate("songs");
  return updatedPlaylist;
};


export const removeSongService = async (playlistId, songId) => {
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) throw new CustomError("Playlist not found", 404);

  const songIndex = playlist.songs.indexOf(songId);
  if (songIndex === -1) {
    throw new CustomError("Song not found in the playlist", 404);
  }

  playlist.songs.splice(songIndex, 1);
  await playlist.save();

  // Optionally populate songs
  const updatedPlaylist = await Playlist.findById(playlistId).populate("songs");

  return updatedPlaylist;
};