import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { UserType, ChannelType, nodeInterface } from '.';

const MessageType = new GraphQLObjectType({
  name: 'Message',
  fields: () => ({
    id: globalIdField(),
    text: { type: new GraphQLNonNull(GraphQLString) },
    channel: {
      type: new GraphQLNonNull(ChannelType),
      resolve: () => {
        // TODO: add resolver
      },
    },
    user: {
      type: new GraphQLNonNull(UserType),
      resolve: () => {
        // TODO: add resolver
      },
    },
  }),
  interfaces: () => [nodeInterface],
});

export default MessageType;
