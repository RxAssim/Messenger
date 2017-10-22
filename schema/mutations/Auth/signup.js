import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import GraphQLEmail from '../../lib/GraphQLTypes/GraphQLEmail';
import { signup as signupService } from '../../services/auth';
import { UserType } from '../../types';

// const signup = {
//   type: LoginUserPayloadType,
//   args: {
//     username: { type: new GraphQLNonNull(GraphQLString) },
//     email: { type: new GraphQLNonNull(GraphQLEmail) },
//     password: { type: new GraphQLNonNull(GraphQLString) },
//   },
//   resolve(parentValue, args, { db }) {
//     return signupService(db, args);
//   },
// };

const Signup = mutationWithClientMutationId({
  name: 'Signup',
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
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
  mutateAndGetPayload: (args, { db }) => signupService(db, args),
});

export default Signup;
