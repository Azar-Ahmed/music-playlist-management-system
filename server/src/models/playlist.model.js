import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema(
  {
    image: { type: String, required: true, trim: true },
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true, 
      ref: 'User' 
    },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }], // <-- many songs here
  },
  { timestamps: true }
);

const Playlist = mongoose.model('Playlist', playlistSchema);
export default Playlist;
