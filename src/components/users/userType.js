const {
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql');

const UserType = new GraphQLObjectType({
  name: "User",
  description: "This represent a user",
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLInt)},
    firstName: {type: new GraphQLNonNull(GraphQLString)},
    lastName: {type: GraphQLString}
  })
});

module.exports = UserType;
