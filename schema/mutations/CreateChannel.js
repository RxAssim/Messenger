import { GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { ChannelType } from '../types';
// import ValidationError from '../lib/ValidationError';

const CreateChannel = mutationWithClientMutationId({
  name: 'CreateChannel',
  inputFields: {
    teamId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    Channel: {
      type: ChannelType,
      resolve: payload => payload,
    },
  },
  mutateAndGetPayload: (args, { db }) => db.Channel.create(args),
});

export default CreateChannel;
