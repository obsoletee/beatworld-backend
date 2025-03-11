import mongoose from 'mongoose';
import { Album } from '../models/album.model.js';
import { Song } from '../models/song.model.js';
import { config } from 'dotenv';

config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Album.deleteMany({});
    await Song.deleteMany({});

    const createdSongs = await Song.insertMany([
      {
        title: 'Sad Songs',
        artist: 'Lil Durk',
        imageUrl: '/cover-images/1.jpg',
        audioUrl: '/songs/1.mp3',
        duration: 156,
        trackNumber: 8,
        plays: 0,
      },
      {
        title: 'Never Again',
        artist: 'Lil Durk',
        imageUrl: '/cover-images/1.jpg',
        audioUrl: '/songs/1.mp3',
        duration: 140,
        trackNumber: 4,
        plays: 0,
      },
      {
        title: 'All My Life (feat. J. Cole)',
        artist: 'Lil Durk, J. Cole',
        imageUrl: '/cover-images/1.jpg',
        audioUrl: '/songs/1.mp3',
        duration: 224,
        trackNumber: 3,
        plays: 0,
      },
      {
        title: 'redrum',
        artist: '21 Savage',
        imageUrl: '/cover-images/1.jpg',
        audioUrl: '/songs/1.mp3',
        duration: 271,
        trackNumber: 3,
        plays: 0,
      },
      {
        title: 'all of me',
        artist: '21 Savage',
        imageUrl: '/cover-images/1.jpg',
        audioUrl: '/songs/1.mp3',
        duration: 198,
        trackNumber: 2,
        plays: 0,
      },
      {
        title: 'n.h.i.e.',
        artist: '21 Savage',
        imageUrl: '/cover-images/1.jpg',
        audioUrl: '/songs/1.mp3',
        duration: 143,
        trackNumber: 4,
        plays: 0,
      },
    ]);

    const albums = [
      {
        title: 'Almost Healed',
        artist: 'Lil Durk',
        imageUrl: '/albums/almost_healed.jpg',
        songs: createdSongs.slice(0, 3).map((song) => song._id),
      },
      {
        title: 'american dream',
        artist: '21 Savage',
        imageUrl: '/albums/american_dream.jpg',
        songs: createdSongs.slice(3, 6).map((song) => song._id),
      },
    ];

    const createdAlbums = await Album.insertMany(albums);

    for (let i = 0; i < createdAlbums.length; i++) {
      const album = createdAlbums[i];
      const albumSongs = albums[i].songs;

      await Song.updateMany(
        { _id: { $in: albumSongs } },
        { albumId: album._id },
      );
    }
  } catch (error) {
    console.error('Error seeding songs: ', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
