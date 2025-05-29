import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import songData from "../../songData";

// Fetch songs from local songData.js (mock paging)
export const fetchSongs = createAsyncThunk(
  "songs/fetchSongs",
  async (page = 1) => {
    const pageSize = 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const data = songData.slice(start, end);

     const result = await new Promise((resolve) => {
      setTimeout(() => resolve(data), 300);
    });

    return result;
  }
);

// Add a song to playlist (backend) with token auth and imageUrl (no file upload)
export const addSongToPlaylist = createAsyncThunk(
  "songs/addSongToPlaylist",
  async (
    { playlistId, spotifyId, title, artist, album, image },
    { getState }
  ) => {
    const token = getState().auth.token; // get token dynamically

    const body = {
      playlistId,
      spotifyId,
      title,
      artist,
      album,
      image,
    };

    const response = await axios.post(
      "http://localhost:5001/api/v1/songs/add",
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data.playlist.songs; // updated playlist songs array
  }
);

// Remove a song from playlist (backend) with token auth
export const removeSongFromPlaylist = createAsyncThunk(
  "songs/removeSongFromPlaylist",
  async ({ playlistId, songId }, { getState }) => {
    const token = getState().auth.token; // get token dynamically

    const response = await axios.post(
      "http://localhost:5001/api/v1/songs/remove",
      { playlistId, songId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data.playlist.songs; // updated playlist songs array
  }
);

const songSlice = createSlice({
  name: "songs",
  initialState: {
    songs: [],
    page: 1,
    hasMore: true,
    status: "idle",
    error: null,
  },
  reducers: {
    resetSongs: (state) => {
      state.songs = [];
      state.page = 1;
      state.hasMore = true;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchSongs handlers (local data)
      .addCase(fetchSongs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.songs.push(...action.payload);
        state.page += 1;
        if (action.payload.length === 0) {
          state.hasMore = false;
        }
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // addSongToPlaylist handlers (backend)
      .addCase(addSongToPlaylist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addSongToPlaylist.fulfilled, (state, action) => {
        state.status = "succeeded";
        // action.payload = updated playlist songs array from backend

        // Merge songs with existing songs avoiding duplicates by spotifyId
        const existingSpotifyIds = new Set(state.songs.map((s) => s.spotifyId));
        action.payload.forEach((song) => {
          if (!existingSpotifyIds.has(song.spotifyId)) {
            state.songs.push(song);
          }
        });
      })
      .addCase(addSongToPlaylist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // removeSongFromPlaylist handlers (backend)
      .addCase(removeSongFromPlaylist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeSongFromPlaylist.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Replace current songs with updated playlist songs
        state.songs = action.payload;
      })
      .addCase(removeSongFromPlaylist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetSongs } = songSlice.actions;
export default songSlice.reducer;
