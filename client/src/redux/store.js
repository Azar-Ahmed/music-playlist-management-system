import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import playlistReducer from './slice/playlistSlice'
import songReducer from './slice/songSlice'



export const store = configureStore({
  reducer: {
    auth: authReducer,
    playlist: playlistReducer,
    songs: songReducer,
  },
})