import {
  nodeDefinitions,
  fromGlobalId,
  connectionDefinitions,
} from 'graphql-relay';
import { User, Channel, Message } from '../models';
import MessageType from './Message';
import ChannelType from './Channel';
import UserType from './User';
import TeamType from './Team';
import LoginPayloadType from './LoginUserPayload';

/**
 * We get the node interface and field from the relay library.
 *
 * The first method is the way we resolve an ID to its object.
 * The second is the way we resolve an object that implements 
 * node to its type.
 */
export const { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    const { type, id } = fromGlobalId(globalId);
    switch (type) {
      case 'User':
        return User.findById(id);
      case 'Channel':
        return Channel.findById(id);
      case 'Message':
        return Message.findById(id);
      // we will resolve the id of its object
      default:
        return null;
    }
  },
  obj => {
    // we will resolve the object that implements node
    // to its type.
    switch (obj.type) {
      case 'userType':
        return UserType;
      case 'messageType':
        return MessageType;
      case 'channelType':
        return ChannelType;
      default:
        return null;
    }
  },
);

const { connectionType: messageConnection } = connectionDefinitions({
  nodeType: MessageType,
});

const { connectionType: channelConnection } = connectionDefinitions({
  nodeType: ChannelType,
});

const { connectionType: userConnection } = connectionDefinitions({
  nodeType: UserType,
});

const { connectionType: teamConnection } = connectionDefinitions({
  nodeType: TeamType,
});

export {
  MessageType,
  UserType,
  ChannelType,
  TeamType,
  LoginPayloadType,
  messageConnection,
  channelConnection,
  userConnection,
  teamConnection,
};
