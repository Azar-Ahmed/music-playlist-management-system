import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import {
  fetchSongs,
  resetSongs,
  addSongToPlaylist,
} from "../redux/slice/songSlice";
import { fetchPlaylists } from "../redux/slice/playlistSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { songs, status, error, hasMore, page } = useSelector(
    (state) => state.songs
  );
  const { playlists, status: playlistStatus, error: playlistError } = useSelector(
    (state) => state.playlist
  );

  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [addingStatus, setAddingStatus] = useState("idle");
  const [addError, setAddError] = useState(null);

  useEffect(() => {
    dispatch(fetchSongs(page));
  }, [dispatch]);

  useEffect(() => {
    if (modalOpen) {
      dispatch(fetchPlaylists());
    }
  }, [modalOpen, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 100
      ) {
        if (status !== "loading" && hasMore) {
          dispatch(fetchSongs(page));
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [status, hasMore, page, dispatch]);

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const uniqueSongs = filteredSongs.filter(
    (song, index, self) =>
      index === self.findIndex((s) => s.spotifyId === song.spotifyId)
  );

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    dispatch(resetSongs());
    dispatch(fetchSongs(1));
  };

  const openModal = (song) => {
    setSelectedSong(song);
    setAddError(null);
    setAddingStatus("idle");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSong(null);
    setAddError(null);
    setAddingStatus("idle");
  };

  // Now we use image directly from selectedSong.image instead of file upload
  const handleAddToPlaylist = async (playlistId) => {
    setAddingStatus("loading");
    setAddError(null);
    try {
      await dispatch(
        addSongToPlaylist({
          playlistId,
          spotifyId: selectedSong.spotifyId,
          title: selectedSong.title,
          artist: selectedSong.artist,
          album: selectedSong.album,
          image: selectedSong.image,
        })
      ).unwrap();

      setAddingStatus("succeeded");

      setTimeout(() => {
        closeModal();
      }, 1000);
    } catch (err) {
      setAddingStatus("failed");
      setAddError(err.message || "Failed to add song.");
    }
  };

  return (
    <div
      className="p-6 space-y-8 text-white h-screen overflow-y-auto"
      ref={containerRef}
    >
      <Header />

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or artist..."
          className="w-full p-2 rounded bg-gray-800 text-white"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Songs */}
      <section>
        <h3 className="text-xl font-semibold mb-4">All Songs</h3>

        {status === "failed" && <p>Error: {error}</p>}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {uniqueSongs.map(({ spotifyId, title, artist, image, album }) => (
            <div
              key={spotifyId}
              className="bg-gray-900 rounded-lg p-4 cursor-pointer hover:bg-green-600 transition flex flex-col"
            >
              <img
                src={image}
                alt={title}
                className="rounded mb-3 w-full h-[200px] object-cover"
              />
              <h4 className="font-bold">{title}</h4>
              <p className="text-gray-300 text-sm">{artist}</p>
              <p className="text-gray-400 text-xs italic mb-2">{album}</p>
              <button
                onClick={() => openModal({ spotifyId, title, artist, album, image })}
                className="mt-auto bg-green-700 hover:bg-green-500 text-white rounded py-1"
              >
                Add to Playlist
              </button>
            </div>
          ))}
          {status === "loading" && (
            <div className="col-span-4 text-center text-gray-400">Loading...</div>
          )}
        </div>
      </section>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-gray-900 rounded p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl mb-4">Select Playlist to Add Song</h2>

            {/* Removed image file input */}

            {playlistStatus === "loading" && <p>Loading playlists...</p>}
            {playlistStatus === "failed" && (
              <p>Error loading playlists: {playlistError}</p>
            )}

            <ul className="max-h-60 overflow-y-auto mb-4">
              {playlists.map((playlist) => (
                <li
                  key={playlist._id}
                  className="flex justify-between items-center py-2 border-b border-gray-700"
                >
                  <span>{playlist.name}</span>
                  <button
                    disabled={addingStatus === "loading"}
                    onClick={() => handleAddToPlaylist(playlist._id)}
                    className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50"
                  >
                    Add
                  </button>
                </li>
              ))}
            </ul>

            {addingStatus === "loading" && (
              <p className="text-blue-400">Adding song...</p>
            )}
            {addingStatus === "succeeded" && (
              <p className="text-green-400">Added successfully!</p>
            )}
            {addingStatus === "failed" && (
              <p className="text-red-400">Error: {addError}</p>
            )}

            <button
              onClick={closeModal}
              className="mt-4 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
