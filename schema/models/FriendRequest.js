import mongoose from 'mongoose';
import { User } from '.';

const { Schema } = mongoose;

const FriendRequestSchema = new Schema({
  to: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Invitee is required.'],
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Invitor is required.'],
  },
  status: {
    type: String,
    enum: ['accepted', 'rejected', 'requested'],
    default: 'requested',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

FriendRequestSchema.pre('save', async function preSave(next) {
  const to = await User.findById(this.to);
  const from = await User.findById(this.from);
  if (this.status === 'accepted') {
    to.friends.push(from);
    from.friends.push(to);
    await Promise.all([to.save(), from.save()]);
    next();
  }
  next();
});

const FriendRequest = mongoose.model('friendRequest', FriendRequestSchema);

export default FriendRequest;
