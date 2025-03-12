import { User } from '../models/user.model.js';

export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    const user = await User.findOne({ clerkId: id });

    if (!user) {
      const newUser = new User({
        clerkId: id,
        fullName: `${firstName + ' ' + lastName}`,
        firstName: firstName,
        lastName: lastName,
        imageUrl,
      });

      await newUser.save();
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(`Error in authCallback`, error);
    next(error);
  }
};
