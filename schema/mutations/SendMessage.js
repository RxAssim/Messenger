import { GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Message, Channel, User } from '../models';
import { MessageType } from '../types';
// import ValidationError from '../lib/ValidationError';

const SendMessage = mutationWithClientMutationId({
  name: 'SendMessage',
  inputFields: {
    receiverId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    message: {
      type: MessageType,
      resolve: payload => Message.findById(payload.messageId),
    },
  },
  mutateAndGetPayload: async ({ receiverId, content }) => {
    const receiver = await User.findById(receiverId);
    const message = await Message.create({
      to: receiver,
      from: receiver,
      content,
    });
    await Channel.create({
      users: [receiver],
      messages: [message],
    });
    return { messageId: message.id };
  },
});

export default SendMessage;
