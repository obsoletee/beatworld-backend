import { clerkClient } from '@clerk/express';
import { User } from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
  if (!req.auth.userId) {
    return res
      .status(401)
      .json({ message: 'Unauthorized: you must be logged in' });
  }

  next();
};

export const requireSeller = async (req, res, next) => {
  try {
    const id = req.auth.userId;
    const currentUser = await User.findOne({ clerkId: id });

    if (!currentUser.isSeller) {
      return res.status(403).json({
        message:
          'You are using customer account: please switch your account to seller in your profile',
      });
    }
  } catch (error) {
    res.status(500).json({ message: `Internal server error`, error });
  }

  next();
};

export const requireAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: 'Unauthorized: you must be an admin' });
    }
  } catch (error) {
    res.status(500).json({ message: `Internal server error`, error });
  }

  next();
};
