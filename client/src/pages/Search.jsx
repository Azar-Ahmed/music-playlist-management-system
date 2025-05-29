import React, { useState } from 'react';

const dummyResults = [
  { id: 1, type: 'Song', name: 'Blinding Lights', artist: 'The Weeknd' },
  { id: 2, type: 'Artist', name: 'Dua Lipa' },
  { id: 3, type: 'Album', name: 'Future Nostalgia' },
];

export default function Search() {
  const [query, setQuery] = useState('');

  // Filter dummyResults by query (case insensitive)
  const filteredResults = dummyResults.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Search</h2>

      <input
        type="text"
        placeholder="Search for songs, artists, albums..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 mb-8 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <div className="space-y-4">
        {filteredResults.length === 0 && <p>No results found.</p>}
        {filteredResults.map(({ id, type, name, artist }) => (
          <div
            key={id}
            className="bg-gray-900 p-4 rounded cursor-pointer hover:bg-green-600 transition"
          >
            <p className="font-semibold">{name}</p>
            <p className="text-gray-400 text-sm">
              {type} {artist ? `• ${artist}` : ''}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
