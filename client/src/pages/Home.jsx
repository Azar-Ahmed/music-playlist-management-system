import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';

const playlists = [
  {
    id: 1,
    name: 'Discover Weekly',
    description: 'Your weekly mixtape of fresh music',
    image: 'https://i.scdn.co/image/ab67706f00000002a65d792ced0c6ee46b11f09c',
  },
  {
    id: 2,
    name: 'Release Radar',
    description: 'New music from artists you follow',
    image: 'https://i.scdn.co/image/ab67706f00000002305dd9e1ee2d5426bcd7c11a',
  },
  {
    id: 3,
    name: 'Daily Mix 1',
    description: 'Your daily mix of favorites',
    image: 'https://i.scdn.co/image/ab67706f00000002aebbd5a28884b7f5a9b3a568',
  },
  // add more playlists as you like
];

const recentlyPlayed = [
  {
    id: 1,
    name: 'Blinding Lights',
    artist: 'The Weeknd',
    image: 'https://i.scdn.co/image/ab67616d0000b27310db94c681343da55e06a514',
  },
  {
    id: 2,
    name: 'Levitating',
    artist: 'Dua Lipa',
    image: 'https://i.scdn.co/image/ab67616d0000b2732c5f4d47a9f1f2c01ec9c3a9',
  },
  {
    id: 3,
    name: 'Watermelon Sugar',
    artist: 'Harry Styles',
    image: 'https://i.scdn.co/image/ab67616d0000b2736812ee053ce533d839bb263d',
  },
];

const topGenres = ['Pop', 'Hip-Hop', 'Electronic', 'R&B', 'Rock', 'Jazz'];

export default function Home() {
    const { user, loading } = useSelector((state) => state.auth);
  return (
    <div className="p-6 space-y-8 text-white">
      {/* Header */}
      <Header/>
    
      {/* Featured Playlists */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Featured Playlists</h3>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {playlists.map(({ id, name, description, image }) => (
            <div
              key={id}
              className="min-w-[200px] bg-gray-900 rounded-lg p-4 cursor-pointer hover:bg-green-600 transition"
            >
              <img src={image} alt={name} className="rounded mb-3" />
              <h4 className="font-bold">{name}</h4>
              <p className="text-gray-300 text-sm">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Played */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Recently Played</h3>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {recentlyPlayed.map(({ id, name, artist, image }) => (
            <div
              key={id}
              className="min-w-[140px] bg-gray-900 rounded-lg p-3 cursor-pointer hover:bg-green-600 transition flex flex-col items-center"
            >
              <img src={image} alt={name} className="rounded mb-2 w-full" />
              <h4 className="font-semibold text-center">{name}</h4>
              <p className="text-gray-300 text-sm text-center">{artist}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Your Top Genres */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Your Top Genres</h3>
        <div className="flex flex-wrap gap-4">
          {topGenres.map((genre) => (
            <div
              key={genre}
              className="bg-gray-900 rounded-full px-6 py-3 cursor-pointer hover:bg-green-600 transition"
            >
              {genre}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
