import { GraphQLNonNull, GraphQLString } from 'graphql';
import GraphQLEmail from '../../lib/GraphQLTypes/GraphQLEmail';
import { signup as signupService } from '../../services/auth';
import { LoginUserPayloadType } from '../../types';

const signup = {
  type: LoginUserPayloadType,
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLEmail) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(parentValue, args, req) {
    return signupService({ req, ...args });
  },
};

export default signup;
