import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlaylistDetails } from '../redux/slice/playlistSlice';
import { removeSongFromPlaylist } from '../redux/slice/songSlice';
import { useParams, useNavigate } from 'react-router-dom';

export default function PlaylistDetail() {
  const { id } = useParams(); // get playlist ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { playlistDetails, loading, error } = useSelector((state) => state.playlist);
  const songStatus = useSelector((state) => state.songs.status);

  useEffect(() => {
    if (id) {
      dispatch(getPlaylistDetails(id));
    }
  }, [dispatch, id]);

  // Go back handler
  const handleBack = () => {
    navigate(-1);
  };

  // Remove song handler
  const handleRemove = (songId) => {
    dispatch(removeSongFromPlaylist({ playlistId: id, songId })).then(() => {
      dispatch(getPlaylistDetails(id)); // Refresh playlist after removal
    });
  };

  return (
    <div className="p-6 text-white max-w-6xl mx-auto">
      <button
        onClick={handleBack}
        className="mb-6 px-4 py-2 bg-green-600 rounded hover:bg-green-700"
      >
        Back
      </button>

      {loading && <p>Loading playlist details...</p>}
      {error && <p className="text-red-500 font-semibold">Error: {error}</p>}

      {playlistDetails && (
        <div className="bg-gray-900 rounded p-6 shadow-lg">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <img
              src={playlistDetails.image}
              alt={playlistDetails.name}
              className="rounded w-full md:w-1/3 object-cover"
            />
            <div className="flex flex-col justify-between">
              <h2 className="text-3xl font-bold">{playlistDetails.name}</h2>
              <p className="text-gray-300 mb-4">{playlistDetails.description}</p>
            </div>
          </div>

          {/* Song Table */}
          {playlistDetails.songs && playlistDetails.songs.length > 0 ? (
            <div className="overflow-x-auto">
              <h3 className="text-2xl font-semibold mb-4">Songs</h3>
              <table className="min-w-full text-left border border-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 border border-gray-700">Cover</th>
                    <th className="px-4 py-2 border border-gray-700">Title</th>
                    <th className="px-4 py-2 border border-gray-700">Artist</th>
                    <th className="px-4 py-2 border border-gray-700">Album</th>
                    <th className="px-4 py-2 border border-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {playlistDetails.songs.map((song) => (
                    <tr key={song._id || song.id} className="hover:bg-gray-800">
                      <td className="px-4 py-2 border border-gray-700">
                        <img src={song.image} alt={song.title} className="w-12 h-12 rounded" />
                      </td>
                      <td className="px-4 py-2 border border-gray-700">{song.title}</td>
                      <td className="px-4 py-2 border border-gray-700">{song.artist}</td>
                      <td className="px-4 py-2 border border-gray-700">{song.album}</td>
                      <td className="px-4 py-2 border border-gray-700">
                        <button
                          onClick={() => handleRemove(song._id)}
                          disabled={songStatus === 'loading'}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded disabled:opacity-50"
                        >
                          {songStatus === 'loading' ? 'Removing...' : 'Remove'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400">No songs in this playlist.</p>
          )}
        </div>
      )}
    </div>
  );
}
