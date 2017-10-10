import { GraphQLNonNull, GraphQLID, GraphQLError } from 'graphql';
import { User, FriendRequest } from '../models';
import { UserType } from '../types';
import ValidationError from '../lib/ValidationError';

const AddFriend = {
  type: UserType,
  args: {
    friendId: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(_, { friendId }, { viewer }) {
    // TODO: Find or create a friend request
    const v = await viewer;
    if (!v) {
      throw new GraphQLError('You must be authenticated.');
    }
    const errors = [];
    const foundFriend = v.friends.includes(friendId);
    if (foundFriend) {
      errors.push({
        key: 'friendId',
        message: 'You are already friends',
      });
      throw new ValidationError(errors);
    }
    const friend = await User.findById(friendId);
    if (!friend) {
      errors.push({
        key: 'friendId',
        message: "User doesn't exist.",
      });
      throw new ValidationError(errors);
    }
    const friendRequest = await FriendRequest.findOne({
      $or: [{ to: friendId, from: v.id }],
    });
    console.log(friendRequest, 'fr');
    if (!friendRequest) {
      console.log('args', friend.id, v.id);
      const fr = new FriendRequest({ to: friend.id, from: v.id });
      await fr.save();
      return Promise.resolve(v);
    }
    errors.push({
      key: 'friendId',
      message: 'Friend request already sent.',
    });
    throw new ValidationError(errors);
  },
};

export default AddFriend;
