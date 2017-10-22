import mongoose from 'mongoose';

const { Schema } = mongoose;

const ChannelSchema = new Schema({
  to: {
    type: Schema.Types.ObjectId,
    ref: 'channel',
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'message',
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

ChannelSchema.virtual('id').get(function changeId() {
  return this._id.toHexString();
});

ChannelSchema.virtual('type').get(() => 'channelType');

const Channel = mongoose.model('channel', ChannelSchema);

export default Channel;
