import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';

const songs = [
  {
    id: 1,
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 2,
    title: 'Levitating',
    artist: 'Dua Lipa',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: 3,
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
];

export default function Player() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef(null);

  const currentSong = songs[currentIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setProgress((current / duration) * 100);
  };

  const handleProgressChange = (e) => {
    const newProgress = e.target.value;
    audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
    setProgress(newProgress);
  };

  const playPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  const playNext = () => {
    setCurrentIndex((prev) => (prev === songs.length - 1 ? 0 : prev + 1));
    setIsPlaying(true);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex items-center space-x-4">
      <audio
        ref={audioRef}
        src={currentSong.audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onEnded={playNext}
      />

      {/* Song info */}
      <div className="flex-1">
        <p className="font-semibold">{currentSong.title}</p>
        <p className="text-gray-400 text-sm">{currentSong.artist}</p>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4">
        <button onClick={playPrev} aria-label="Previous">
          <FaStepBackward size={20} />
        </button>
        <button onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
        </button>
        <button onClick={playNext} aria-label="Next">
          <FaStepForward size={20} />
        </button>
      </div>

      {/* Progress bar */}
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleProgressChange}
        className="w-48 h-1 rounded-lg cursor-pointer accent-green-600"
      />
    </div>
  );
}
