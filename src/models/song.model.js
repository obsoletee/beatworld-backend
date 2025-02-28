import mongoose from 'mongoose';

const songSchema = new mongoose.Schema(
  {
    title: { type: String, reqired: true },
    artist: { type: String, reqired: true },
    imageUrl: { type: String, reqired: true },
    audioUrl: { type: String, reqired: true },
    releaseDay: { type: String, reqired: true },
    releaseMonth: { type: String, reqired: true },
    releaseYear: { type: String, reqired: true },
    duration: { type: Number, reqired: true },
    albumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Album',
      reqired: false,
    },
  },
  { timestamps: true },
);

export const Song = mongoose.model('Song', songSchema);
