import mongoose from 'mongoose';

const { Schema } = mongoose;

const MessageSchema = new Schema({
  to: {
    type: Schema.Types.ObjectId,
    ref: 'Channel',
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
    required: [true, 'Content is required.'],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model('message', MessageSchema);

export default Message;
