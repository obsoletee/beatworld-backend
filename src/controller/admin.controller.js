import { Album } from '../models/album.model.js';
import { Song } from '../models/song.model.js';
import cloudinary from '../lib/cloudinary.js';

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: 'auto',
    });
    return result.secure_url;
  } catch (error) {
    console.log(`Error in uploadToCloudinary`, error);
    throw new Error(`Error uploading to cloudinary`);
  }
};

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioMp3File || !req.files.imageFile) {
      return res.status(400).json({ message: `Please upload all files` });
    }

    const { title, artistId, albumId, duration } = req.body;

    const audioMp3File = req.files.audioMp3File;
    const audioMp3Url = await uploadToCloudinary(audioMp3File);

    const audioWavUrl = '';
    if (req.files.audioWavFile) {
      const audioWavFile = req.files.audioWavFile;
      audioWavUrl = await uploadToCloudinary(audioWavFile);
    }
    const stemsUrl = '';
    if (req.files.stemsFile) {
      const stemsFile = req.files.stemsFile;
      stemsUrl = await uploadToCloudinary(stemsFile);
    }

    const imageFile = req.files.imageFile;
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new Song({
      title,
      artistId,
      audioMp3Url,
      audioWavUrl,
      stemsUrl,
      imageUrl,
      duration,
      plays: 0,
      albumId: albumId || null,
    });

    await song.save();

    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }

    res.status(201).json(song);
  } catch (error) {
    console.log(`Error in createSong`, error);
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);

    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    await Song.findByIdAndDelete(id);

    res.status(200).json({ message: `Song deleted successfully` });
  } catch (error) {
    console.log(`Error in deleteSong`, error);
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    if (!req.files || !req.files.imageFile) {
      return res.status(400).json({ message: `Please upload all files` });
    }

    const { title, ownerId, description } = req.body;

    const imageFile = req.files.imageFile;

    const imageUrl = await uploadToCloudinary(imageFile);

    const album = new Album({
      title,
      ownerId,
      imageUrl,
      description,
    });

    await album.save();

    res.status(201).json(album);
  } catch (error) {
    console.log(`Error in createAlbum`, error);
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Обновляем все песни, связанные с альбомом, устанавливая albumId в null
    await Song.updateMany({ albumId: id }, { $set: { albumId: null } });

    // Удаляем альбом
    await Album.findByIdAndDelete(id);

    res.status(200).json({ message: 'Album deleted successfully' });
  } catch (error) {
    console.log('Error in deleteAlbum', error);
    next(error);
  }
};

export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true });
};
