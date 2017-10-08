import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';

import { MessageType, ChannelType } from '.';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    friends: { type: new GraphQLList(UserType) },
    messages: { type: new GraphQLList(MessageType) },
    channels: { type: new GraphQLList(ChannelType) },
  }),
});

export default UserType;
