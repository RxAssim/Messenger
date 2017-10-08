import { GraphQLNonNull, GraphQLString } from 'graphql';
// import mongoose from "mongoose";
import { UserType } from '../../types';
// import User from '../../../models/User';

// const User = mongoose.model("user");

const getUser = {
  type: UserType,
  args: { id: { type: new GraphQLNonNull(GraphQLString) } },
  resolve(_, args, context) {
    console.log(args, context);
    return 'hello';
  },
};

export default getUser;
