import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { connectionArgs, globalIdField } from 'graphql-relay';
import { nodeInterface, teamConnection } from '.';

/**
 * TODO: 
 *  - Use Postgres instead of MongoDB because of the queries.
 */

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField(),
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    teams: {
      type: teamConnection,
      args: connectionArgs,
      resolve: () => {
        // TODO: add resolver
      },
    },
  }),
  interfaces: () => [nodeInterface],
});

export default UserType;
