import { GraphQLObjectType } from "graphql";
import UserQueries from "./userQueries";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    ...UserQueries
  })
});

export default RootQuery;
