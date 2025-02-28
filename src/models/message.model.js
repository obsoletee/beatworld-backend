import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: String, reqired: true },
    receiverId: { type: String, reqired: true },
    content: { type: String, reqired: true },
  },
  { timestamps: true },
);

export const Message = mongoose.model('Message', messageSchema);
