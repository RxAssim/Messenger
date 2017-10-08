import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';
import { UserType, MessageType } from '.';

const ChannelType = new GraphQLObjectType({
  name: 'Channel',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    users: { type: new GraphQLList(UserType) },
    messages: { type: new GraphQLList(MessageType) },
  }),
});

export default ChannelType;
