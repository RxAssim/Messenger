import mongoose from 'mongoose';

const { Schema } = mongoose;

const ChannelSchema = new Schema({
  to: {
    type: Schema.Types.ObjectId,
    ref: 'Channel',
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Channel = mongoose.model('channel', ChannelSchema);

export default Channel;
