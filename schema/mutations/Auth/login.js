import { GraphQLNonNull, GraphQLString } from 'graphql';
import GraphQLEmail from '../../lib/GraphQLTypes/GraphQLEmail';
import { login as loginService } from '../../services/auth';
import { LoginUserPayloadType } from '../../types';

const login = {
  type: LoginUserPayloadType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLEmail) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(parentValue, args, req) {
    return loginService({ req, ...args });
  },
};

export default login;
