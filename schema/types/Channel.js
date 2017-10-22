import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';
import { connectionArgs, globalIdField } from 'graphql-relay';
import { nodeInterface, messageConnection, userConnection } from '.';

const ChannelType = new GraphQLObjectType({
  name: 'Channel',
  fields: () => ({
    id: globalIdField(),
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    public: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    users: {
      type: userConnection,
      args: connectionArgs,
      resolve: () => {
        // TODO: Add resolver
      },
    },
    messages: {
      type: messageConnection,
      args: connectionArgs,
      resolve: () => {
        // TODO: Add resolver
      },
    },
  }),
  interfaces: () => [nodeInterface],
});

export default ChannelType;
