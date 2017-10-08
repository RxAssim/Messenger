import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';
import GraphQLMoment from '../lib/GraphQLTypes/GraphQLMoment';
import { UserType, ChannelType } from '.';

const MessageType = new GraphQLObjectType({
  name: 'Message',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    to: { type: new GraphQLNonNull(ChannelType) },
    from: { type: new GraphQLNonNull(UserType) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: new GraphQLNonNull(GraphQLMoment) },
  }),
});

export default MessageType;
