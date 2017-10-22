import { GraphQLNonNull, GraphQLString } from 'graphql';
import { UserType } from '../../types';
import User from '../../models/User';

const getUser = {
  type: UserType,
  args: { id: { type: new GraphQLNonNull(GraphQLString) } },
  resolve: (_, args) => User.findById(args.id),
};

export default getUser;
