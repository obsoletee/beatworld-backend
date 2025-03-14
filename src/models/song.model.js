import mongoose from 'mongoose';

const songSchema = new mongoose.Schema(
  {
    title: { type: String, reqired: true },
    // artist: { type: String, reqired: true },
    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      reqired: true,
    },
    imageUrl: { type: String, reqired: true },
    audioMp3Url: { type: String, reqired: true },
    audioWavUrl: { type: String },
    audioStemsUrl: { type: String },
    duration: { type: Number, reqired: true },
    plays: { type: Number, reqired: true },
    trackNumber: { type: Number, reqired: true },
    albumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Album',
      reqired: false,
    },
  },
  { timestamps: true },
);

export const Song = mongoose.model('Song', songSchema);
