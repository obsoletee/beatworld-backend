import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema(
  {
    title: { type: String, reqired: true },
    artist: { type: String, reqired: true },
    imageUrl: { type: String, reqired: true },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  },
  { timestamps: true },
);

export const Album = mongoose.model('Album', albumSchema);
