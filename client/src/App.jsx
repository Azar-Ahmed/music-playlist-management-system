import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { useSelector } from 'react-redux'

import Sidebar from './components/Sidebar'
import Player from './components/Player'

import Home from './pages/Home'
import Search from './pages/Search'
import Playlist from './pages/Playlist'
import PlaylistDetail from './pages/PlaylistDetail';
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
})

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth)

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Routes */}
          {!isAuthenticated && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}

          {/* Protected Routes */}
          {isAuthenticated && (
            <Route
              path="/*"
              element={
                <div className="flex flex-col h-screen">
                  <div className="flex flex-1 overflow-hidden">
                    <Sidebar />
                    <main className="flex-1 bg-gray-800 overflow-y-auto">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/playlist" element={<Playlist />} />
                        <Route path="/playlists/:id" element={<PlaylistDetail />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </main>
                  </div>
                  <Player />
                </div>
              }
            />
          )}
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
