import { GraphQLObjectType } from 'graphql';
import * as authMutations from './Auth';
// import SendMessage from './SendMessage';
import CreateTeam from './CreateTeam';

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...authMutations,
    // SendMessage,
    CreateTeam,
  },
});

export default mutation;
