import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLError,
  GraphQLEnumType,
} from 'graphql';
import { User, FriendRequest } from '../models';
import { UserType } from '../types';
import ValidationError from '../lib/ValidationError';

const ActionType = new GraphQLEnumType({
  name: 'action',
  values: {
    accept: { value: 'accepted' },
    reject: { value: 'rejected' },
  },
});

const HandleFriendRequest = {
  type: UserType,
  args: {
    friendRequestId: { type: new GraphQLNonNull(GraphQLID) },
    action: { type: new GraphQLNonNull(ActionType) },
  },
  async resolve(_, { friendRequestId, action }, { viewer }) {
    // TODO: Find or create a friend request
    const v = await viewer;
    if (!v) {
      throw new GraphQLError('You must be authenticated.');
    }
    const errors = [];
    const friendRequest = await FriendRequest.findById(friendRequestId);
    if (!friendRequest) {
      errors.push({
        key: 'friendRequestId',
        message: "Friend request doesn't exist.",
      });
      throw new ValidationError(errors);
    }
    if (friendRequest.status !== 'requested') {
      errors.push({
        key: 'friendRequestId',
        message: `Friend request already ${friendRequest.status} .`,
      });
      throw new ValidationError(errors);
    }
    friendRequest.status = action;
    await friendRequest.save();
    return v.populate('friends').execPopulate();
  },
};

export default HandleFriendRequest;
