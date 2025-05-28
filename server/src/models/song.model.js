import mongoose from 'mongoose';

const songSchema = new mongoose.Schema(
  {
    spotifyId: { type: String, required: true, unique: true, trim: true }, // to avoid duplicates
    image: { type: String, trim: true },
    title: { type: String, required: true, trim: true },
    artist: { type: String, required: true, trim: true },
    album: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Song = mongoose.model('Song', songSchema);
export default Song;
