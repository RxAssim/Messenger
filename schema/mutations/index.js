import { GraphQLObjectType } from 'graphql';
import * as authMutations from './Auth';

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...authMutations,
  },
});

export default mutation;
