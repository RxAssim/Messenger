import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { connectionArgs, globalIdField } from 'graphql-relay';
import { nodeInterface, channelConnection, userConnection, UserType } from '.';

const TeamType = new GraphQLObjectType({
  name: 'Team',
  fields: () => ({
    id: globalIdField(),
    name: { type: new GraphQLNonNull(GraphQLString) },
    owner: {
      type: new GraphQLNonNull(UserType),
    },
    members: {
      type: userConnection,
      args: connectionArgs,
      resolve: () => {
        // TODO: Add resolver
      },
    },
    channels: {
      type: channelConnection,
      args: connectionArgs,
      resolve: () => {
        // TODO: Add resolver
      },
    },
  }),
  interfaces: () => [nodeInterface],
});

export default TeamType;
