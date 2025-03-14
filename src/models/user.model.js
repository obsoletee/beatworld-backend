import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, reqired: true },
    lastName: { type: String, reqired: true },
    fullName: { type: String, reqired: true },
    username: { type: String, required: true },
    isSeller: { type: Boolean, required: true },
    isSubscribePlanStarter: { type: Boolean, required: true },
    isSubscribePlanProfessional: { type: Boolean, required: true },
    imageUrl: { type: String, reqired: true },
    clerkId: { type: String, reqired: true, unique: true },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema);
