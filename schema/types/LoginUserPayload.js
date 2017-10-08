import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

import { UserType } from '.';

const LoginUserPayloadType = new GraphQLObjectType({
  name: 'LoginUserPayload',
  fields: () => ({
    user: { type: new GraphQLNonNull(UserType) },
    token: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export default LoginUserPayloadType;
