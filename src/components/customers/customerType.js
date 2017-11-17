const {
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql');

const CustomerType = new GraphQLObjectType({
  name: "Customer",
  description: "This represent a user",
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLInt)},
    firstName: {type: new GraphQLNonNull(GraphQLString)},
    lastName: {type: new GraphQLNonNull(GraphQLString)},
    phone: {type: GraphQLString},
    city: {type: GraphQLString},
    street: {type: GraphQLString},
    postcode: {type: GraphQLString},
  })
});

module.exports = CustomerType;
