import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/v1/playlist';

// Async Thunks

// 1. Get all playlists
export const fetchPlaylists = createAsyncThunk(
  'playlist/fetchAll',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token; // get token dynamically
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch playlists');
    }
  }
);

// 2. Get a single playlist
export const getPlaylistDetails = createAsyncThunk(
  'playlist/details',
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await axios.get(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to get playlist details');
    }
  }
);

// 3. Add a new playlist
export const addPlaylist = createAsyncThunk(
  'playlist/add',
  async (formData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await axios.post(`${API_URL}/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return res.data.playlist;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add playlist');
    }
  }
);

// 4. Update a playlist
export const updatePlaylist = createAsyncThunk(
  'playlist/update',
  async ({ id, formData }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await axios.put(`${API_URL}/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return res.data.playlist;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update playlist');
    }
  }
);

// 5. Delete a playlist
export const deletePlaylist = createAsyncThunk(
  'playlist/delete',
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      await axios.delete(`${API_URL}/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete playlist');
    }
  }
);

// Playlist Slice
const playlistSlice = createSlice({
  name: 'playlist',
  initialState: {
    playlists: [],
    playlistDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchPlaylists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlaylists.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists = action.payload;
      })
      .addCase(fetchPlaylists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Details
      .addCase(getPlaylistDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlaylistDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.playlistDetails = action.payload;
      })
      .addCase(getPlaylistDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Playlist
      .addCase(addPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists.push(action.payload);
      })
      .addCase(addPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Playlist
      .addCase(updatePlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists = state.playlists.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );
      })
      .addCase(updatePlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Playlist
      .addCase(deletePlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists = state.playlists.filter((p) => p._id !== action.payload);
      })
      .addCase(deletePlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default playlistSlice.reducer;
