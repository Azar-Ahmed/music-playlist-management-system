import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlaylistDetails } from '../redux/slice/playlistSlice';
import { useParams, useNavigate } from 'react-router-dom';

export default function PlaylistDetail() {
  const { id } = useParams(); // get playlist ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { playlistDetails, loading, error } = useSelector((state) => state.playlist);

  useEffect(() => {
    if (id) {
      dispatch(getPlaylistDetails(id));
    }
  }, [dispatch, id]);

  // Go back handler
  const handleBack = () => {
    navigate(-1); // navigate back to previous page
  };

  return (
    <div className="p-6 text-white max-w-4xl mx-auto">
      <button
        onClick={handleBack}
        className="mb-6 px-4 py-2 bg-green-600 rounded hover:bg-green-700"
      >
        Back
      </button>

      {loading && <p>Loading playlist details...</p>}

      {error && (
        <p className="text-red-500 font-semibold">Error: {error}</p>
      )}

      {playlistDetails && (
        <div className="bg-gray-900 rounded p-6 shadow-lg flex flex-col md:flex-row gap-6">
          <img
            src={playlistDetails.image}
            alt={playlistDetails.name}
            className="rounded w-full md:w-1/3 object-cover"
          />
          <div className="flex flex-col justify-between">
            <h2 className="text-3xl font-bold mb-4">{playlistDetails.name}</h2>
            <p className="text-gray-300 mb-4">{playlistDetails.description}</p>

            {/* Additional details can go here */}
            {playlistDetails.songs && playlistDetails.songs.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Songs</h3>
                <ul className="list-disc list-inside space-y-1 max-h-64 overflow-y-auto">
                  {playlistDetails.songs.map((song) => (
                    <li key={song._id || song.id}>
                      {song.title} - {song.artist}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
