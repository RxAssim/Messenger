import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { TeamType } from '../types';
// import ValidationError from '../lib/ValidationError';

const CreateTeam = mutationWithClientMutationId({
  name: 'CreateTeam',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    team: {
      type: TeamType,
      resolve: payload => payload,
    },
  },
  mutateAndGetPayload: (args, { viewer, db }) =>
    db.Team.create({ ...args, owner: viewer.id }),
});

export default CreateTeam;
