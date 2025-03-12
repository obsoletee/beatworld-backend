import { User } from '../models/user.model.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.auth.userId;
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(`Error in getAllUsers`);
    next(error);
  }
};
