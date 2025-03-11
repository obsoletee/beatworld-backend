import mongoose from 'mongoose';
import { Song } from '../models/song.model.js';
import { config } from 'dotenv';

config();

const songs = [
  {
    title: 'Sad Songs',
    artist: 'Lil Durk',
    imageUrl: '/cover-images/1.jpg',
    audioUrl: '/songs/1.mp3',
    duration: 156,
  },
  {
    title: 'Miami Disco',
    artist: 'Perturbator',
    imageUrl: '/cover-images/1.jpg',
    audioUrl: '/songs/1.mp3',
    duration: 271,
  },
  {
    title: 'redrum',
    artist: '21 Savage',
    imageUrl: '/cover-images/1.jpg',
    audioUrl: '/songs/1.mp3',
    duration: 271,
  },
  {
    title: 'Opportunist',
    artist: 'Lil Durk',
    imageUrl: '/cover-images/1.jpg',
    audioUrl: '/songs/1.mp3',
    duration: 156,
  },
  {
    title: 'Leave Me Like This',
    artist: 'Scrillex, Bobby Raps',
    imageUrl: '/cover-images/1.jpg',
    audioUrl: '/songs/1.mp3',
    duration: 189,
  },
  {
    title: 'Metro Spider (with Young Thug)',
    artist: 'Metro Boomin, Young Thug',
    imageUrl: '/cover-images/1.jpg',
    audioUrl: '/songs/1.mp3',
    duration: 175,
  },
  {
    title: 'Pure Cocaine',
    artist: 'Lil Baby',
    imageUrl: '/cover-images/1.jpg',
    audioUrl: '/songs/1.mp3',
    duration: 154,
  },
  {
    title: 'HIM ALL ALONG',
    artist: 'Gunna',
    imageUrl: '/cover-images/1.jpg',
    audioUrl: '/songs/1.mp3',
    duration: 159,
  },
];

const seedSongs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Song.deleteMany({});
    await Song.insertMany(songs);
  } catch (error) {
    console.error('Error seeding songs: ', error);
  } finally {
    mongoose.connection.close();
  }
};

seedSongs();
