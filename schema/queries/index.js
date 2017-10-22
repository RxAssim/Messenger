import { GraphQLObjectType } from 'graphql';
import UserQueries from './userQueries';
import { nodeField } from '../types';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    ...UserQueries,
    node: nodeField,
  }),
});

export default RootQuery;
