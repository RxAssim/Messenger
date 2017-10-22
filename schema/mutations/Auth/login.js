import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import GraphQLEmail from '../../lib/GraphQLTypes/GraphQLEmail';
import { login as loginService } from '../../services/auth';
import { UserType } from '../../types';

// const login = {
//   type: LoginUserPayloadType,
//   args: {
//     email: { type: new GraphQLNonNull(GraphQLEmail) },
//     password: { type: new GraphQLNonNull(GraphQLString) },
//   },
//   resolve(parentValue, args, { db }) {
//     return loginService(db, args);
//   },
// };

const Login = mutationWithClientMutationId({
  name: 'Login',
  inputFields: {
    email: { type: new GraphQLNonNull(GraphQLEmail) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    user: {
      type: UserType,
      resolve: payload => payload.user,
    },
    token: {
      type: GraphQLString,
      resolve: payload => payload.token,
    },
  },
  mutateAndGetPayload: (args, { db }) => loginService(db, args),
});

export default Login;
