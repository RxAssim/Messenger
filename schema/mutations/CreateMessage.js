import { GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { MessageType } from '../types';
// import ValidationError from '../lib/ValidationError';

const CreateMessage = mutationWithClientMutationId({
  name: 'CreateMessage',
  inputFields: {
    channelId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    text: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    Message: {
      type: MessageType,
      resolve: payload => payload,
    },
  },
  mutateAndGetPayload: (args, { viewer, db }) =>
    db.Message.create({ ...args, userId: viewer.id }),
});

export default CreateMessage;
