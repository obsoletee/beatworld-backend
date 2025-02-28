import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, reqired: true },
    imageUrl: { type: String, reqired: true },
    clerkId: { type: String, reqired: true, unique: true },
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema);
