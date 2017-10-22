import { GraphQLID, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';
import {
  UserType,
  MessageType,
  LoginPayloadType,
  ChannelType,
  channelConnection,
  messageConnection,
  userConnection,
} from '../schema/types';
import GraphQLMoment from '../schema/lib/GraphQLTypes/GraphQLMoment';

test('fields of the type: UserType', () => {
  expect(UserType.getFields()).toHaveProperty('id');
  expect(UserType.getFields()).toHaveProperty('username');
  expect(UserType.getFields()).toHaveProperty('email');
  expect(UserType.getFields()).toHaveProperty('channels');
  expect(UserType.getFields()).toHaveProperty('messages');
});

test('field types of the type: UserType', () => {
  expect(UserType.getFields().id.type).toEqual(new GraphQLNonNull(GraphQLID));
  expect(UserType.getFields().username.type).toEqual(
    new GraphQLNonNull(GraphQLString),
  );
  expect(UserType.getFields().email.type).toEqual(
    new GraphQLNonNull(GraphQLString),
  );
  expect(UserType.getFields().channels.type).toEqual(channelConnection);
  expect(UserType.getFields().messages.type).toEqual(messageConnection);
});

test('fields of the type: MessageType', () => {
  expect(MessageType.getFields()).toHaveProperty('id');
  expect(MessageType.getFields()).toHaveProperty('to');
  expect(MessageType.getFields()).toHaveProperty('from');
  expect(MessageType.getFields()).toHaveProperty('content');
  expect(MessageType.getFields()).toHaveProperty('createdAt');
});

test('field types of the type: MessageType', () => {
  expect(MessageType.getFields().id.type).toEqual(
    new GraphQLNonNull(GraphQLID),
  );
  expect(MessageType.getFields().to.type).toEqual(
    new GraphQLNonNull(ChannelType),
  );
  expect(MessageType.getFields().from.type).toEqual(
    new GraphQLNonNull(UserType),
  );
  expect(MessageType.getFields().content.type).toEqual(
    new GraphQLList(GraphQLString),
  );
  expect(MessageType.getFields().createdAt.type).toEqual(
    new GraphQLList(GraphQLMoment),
  );
});

test('fields of the type: ChannelType', () => {
  expect(ChannelType.getFields()).toHaveProperty('id');
  expect(ChannelType.getFields()).toHaveProperty('users');
  expect(ChannelType.getFields()).toHaveProperty('messages');
});

test('field types of the type: ChannelType', () => {
  expect(ChannelType.getFields().id.type).toEqual(
    new GraphQLNonNull(GraphQLID),
  );
  expect(ChannelType.getFields().users.type).toEqual(userConnection);
  expect(ChannelType.getFields().messages.type).toEqual(messageConnection);
});

test('fields of the type: LoginUserPayloadType', () => {
  expect(LoginPayloadType.getFields()).toHaveProperty('user');
  expect(LoginPayloadType.getFields()).toHaveProperty('token');
});

test('field types of the type: LoginUserPayloadType', () => {
  expect(LoginPayloadType.getFields().user.type).toEqual(
    new GraphQLNonNull(UserType),
  );
  expect(LoginPayloadType.getFields().token.type).toEqual(
    new GraphQLNonNull(GraphQLString),
  );
});
