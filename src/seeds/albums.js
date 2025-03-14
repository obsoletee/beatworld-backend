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
        artistId: '67d177de28485f7029863002',
        imageUrl: '/cover-images/1.jpg',
        audioMp3Url: '/songs/1.mp3',
        duration: 156,
        trackNumber: 8,
        plays: 0,
      },
      {
        title: 'Never Again',
        artistId: '67d177de28485f7029863002',
        imageUrl: '/cover-images/1.jpg',
        audioMp3Url: '/songs/Lil-Durk-Never-Again.mp3',
        duration: 140,
        trackNumber: 4,
        plays: 0,
      },
      {
        title: 'All My Life (feat. J. Cole)',
        artistId: '67d177de28485f7029863002',
        imageUrl: '/cover-images/1.jpg',
        audioMp3Url: '/songs/1.mp3',
        duration: 224,
        trackNumber: 3,
        plays: 0,
      },
      {
        title: 'Therapy Session',
        artistId: '67d177de28485f7029863002',
        imageUrl: '/cover-images/1.jpg',
        audioMp3Url: '/songs/1.mp3',
        duration: 87,
        trackNumber: 1,
        plays: 0,
      },
      {
        title: 'Pelle Coat',
        artistId: '67d177de28485f7029863002',
        imageUrl: '/cover-images/1.jpg',
        audioMp3Url: '/songs/1.mp3',
        duration: 253,
        trackNumber: 2,
        plays: 0,
      },
      {
        title: 'Put Em On Ice',
        artistId: '67d177de28485f7029863002',
        imageUrl: '/cover-images/1.jpg',
        audioMp3Url: '/songs/1.mp3',
        duration: 123,
        trackNumber: 5,
        plays: 0,
      },
      {
        title: 'Big Dawg (feat. Chief Wuk)',
        artistId: '67d177de28485f7029863002',
        imageUrl: '/cover-images/1.jpg',
        audioMp3Url: '/songs/1.mp3',
        duration: 160,
        trackNumber: 6,
        plays: 0,
      },
      {
        title: 'Never Imagined (feat. Future)',
        artistId: '67d177de28485f7029863002',
        imageUrl: '/cover-images/1.jpg',
        audioMp3Url: '/songs/1.mp3',
        duration: 192,
        trackNumber: 7,
        plays: 0,
      },
      {
        title: 'Before Fajr',
        artistId: '67d177de28485f7029863002',
        imageUrl: '/cover-images/1.jpg',
        audioMp3Url: '/songs/1.mp3',
        duration: 120,
        trackNumber: 9,
        plays: 0,
      },
      {
        title: 'redrum',
        artistId: '67d1965693e479643d30e17e',
        imageUrl: '/cover-images/1.jpg',
        audioMp3Url: '/songs/1.mp3',
        duration: 271,
        trackNumber: 3,
        plays: 0,
      },
      {
        title: 'all of me',
        artistId: '67d1965693e479643d30e17e',
        imageUrl: '/cover-images/1.jpg',
        audioMp3Url: '/songs/1.mp3',
        duration: 198,
        trackNumber: 2,
        plays: 0,
      },
      {
        title: 'n.h.i.e.',
        artistId: '67d1965693e479643d30e17e',
        imageUrl: '/cover-images/1.jpg',
        audioMp3Url: '/songs/1.mp3',
        duration: 143,
        trackNumber: 4,
        plays: 0,
      },
    ]);

    const albums = [
      {
        title: 'Almost Healed',
        ownerId: '67d177de28485f7029863002',
        imageUrl: '/albums/almost_healed.jpg',
        songs: createdSongs.slice(0, 9).map((song) => song._id),
      },
      {
        title: 'american dream',
        ownerId: '67d1965693e479643d30e17e',
        imageUrl: '/albums/american_dream.jpg',
        songs: createdSongs.slice(9, 12).map((song) => song._id),
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
