import { GraphQLObjectType } from 'graphql';
import * as authMutations from './Auth';
import AddFriend from './AddFriend';
import HandleFriendRequest from './HandleFriendRequest';

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...authMutations,
    AddFriend,
    HandleFriendRequest,
  },
});

export default mutation;
