import { Song } from '../models/song.model.js';

export const getAllSongs = async (req, res, next) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.status(200).json(songs);
  } catch (error) {
    console.log(`Error in getAllSongs`);
    next(error);
  }
};

export const getFeaturedSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 6 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artistId: 1,
          imageUrl: 1,
          audioMp3Url: 1,
        },
      },
    ]);

    res.status(200).json(songs);
  } catch (error) {
    console.log(`Error in getFeaturedSongs`);
    next(error);
  }
};

export const getMadeForYouSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artistId: 1,
          imageUrl: 1,
          audioMp3Url: 1,
        },
      },
    ]);

    res.status(200).json(songs);
  } catch (error) {
    console.log(`Error in getFeaturedSongs`);
    next(error);
  }
};

export const getTrendingSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 6 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artistId: 1,
          imageUrl: 1,
          audioMp3Url: 1,
        },
      },
    ]);

    res.status(200).json(songs);
  } catch (error) {
    console.log(`Error in getFeaturedSongs`);
    next(error);
  }
};

export const updatePlays = async (req, res, next) => {
  try {
    const { id } = req.params;

    const song = await Song.findOne({ _id: id });

    await Song.updateOne({ _id: id }, { $set: { plays: song.plays + 1 } });

    res.status(200).json({ message: 'Plays added successfully' });
  } catch (error) {
    console.log('Error in updatePlays', error);
    next(error);
  }
};
