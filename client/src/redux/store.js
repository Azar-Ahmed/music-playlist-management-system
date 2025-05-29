import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import playlistReducer from './slice/playlistSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    playlist: playlistReducer,
  },
})