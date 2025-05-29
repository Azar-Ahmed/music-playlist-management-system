
# 🎵 Music Playlist App

A full-stack music playlist manager where users can:
- Browse and search songs
- Add songs to playlists
- Upload playlist images via Cloudinary
- Register/login/logout with secure JWT auth
- Use infinite scroll for song loading

Built with **React**, **Redux Toolkit**, **Express**, **MongoDB**, and **Cloudinary**.

---

## 🧰 Tech Stack

### Frontend
- React.js
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS + React Icons
- React Bootstrap (optional)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Cloudinary for image upload
- Multer for `multipart/form-data`
- JWT for Authentication

---

## 📁 Folder Structure

### Frontend (`/client`)
\`\`\`
src/
│
├── components/          # Header, Sidebar, Filters, etc.
├── pages/               # Home, Login, Register, Profile, Playlist
├── redux/
│   ├── slice/
│   │   ├── authSlice.js
│   │   ├── songSlice.js
│   │   └── playlistSlice.js
│   └── store.js
├── App.js
└── index.js
\`\`\`

### Backend (`/server`)
\`\`\`
server/
│
├── controllers/
│   ├── authController.js
│   ├── songController.js
│   └── playlistController.js
│
├── routes/
│   ├── authRoutes.js
│   ├── songRoutes.js
│   └── playlistRoutes.js
│
├── middlewares/
│   ├── authMiddleware.js
│   └── errorHandler.js
│
├── models/
│   ├── User.js
│   ├── Song.js
│   └── Playlist.js
│
├── utils/
│   └── cloudinary.js
│
├── server.js
└── config.js
\`\`\`

---

## ⚙️ Features

### ✅ Authentication
- JWT-based register/login/logout
- Protected routes using `authMiddleware`

### 🎶 Songs
- Fetched from external API or dummy JSON
- Infinite scroll with lazy loading
- Search by title or artist
- Add to playlist with image URL
- Avoid duplicates by `spotifyId`

### 📁 Playlists
- Create, update, delete playlists
- Upload playlist images using Cloudinary
- Add/remove songs in playlists
- Show all songs in each playlist

### 📸 Cloudinary Integration
- Playlist image uploaded via `multipart/form-data`
- Songs use direct image URLs (e.g. from Spotify)

---

## 🧪 API Endpoints

### Auth
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/signout`

### Songs
- `GET /api/v1/songs?page=1`
- `POST /api/v1/songs/add`  
  (payload: `{ playlistId, spotifyId, title, artist, album, image }`)

### Playlists
- `POST /api/v1/playlists/create`  
  (with `multipart/form-data`)
- `GET /api/v1/playlists`
- `DELETE /api/v1/playlists/:id`
- `PUT /api/v1/playlists/:id/add-song`

---

## 🪄 How to Run

### 1. Clone the Repo

\`\`\`bash
git clone https://github.com/yourusername/music-playlist-app.git
cd music-playlist-app
\`\`\`

### 2. Install Dependencies

**Backend:**

\`\`\`bash
cd server
npm install
\`\`\`

**Frontend:**

\`\`\`bash
cd client
npm install
\`\`\`

### 3. Set Up Environment Variables

Create a `.env` file in `/server`:

\`\`\`env
PORT=5001
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
\`\`\`

### 4. Run Development Servers

**Backend:**
\`\`\`bash
npm run dev
\`\`\`

**Frontend:**
\`\`\`bash
npm start
\`\`\`

---

## 📌 Notes

- Uses Redux Toolkit for global state management (`auth`, `songs`, `playlists`)
- Handles edge cases (duplicate songs, invalid token, missing image)
- Proper error handling on API failures
- Works with paginated data and Cloudinary image URLs

---

## ✨ Future Enhancements

- Like/Dislike songs
- Playlist sharing
- User profile image with Cloudinary
- Backend caching with Redis
- Dark/light theme toggle

---

## 📸 Screenshots

Coming soon...

---

## 📜 License

MIT
