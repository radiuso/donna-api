const { makeExecutableSchema } = require('graphql-tools');
const objectAssignDeep = require('object-assign-deep');

const dateResolver = require('./resolvers/dateResolver');
const UserSchema = require('./components/users/userSchema');
const CustomerSchema = require('./components/customers/customerSchema');
const OrderSchema = require('./components/orders/orderSchema');

const SchemaDefinition = `
  scalar Date

  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    version: String!
    ${UserSchema.query}
    ${CustomerSchema.query}
    ${OrderSchema.query}
  }

  type Mutation {
    ${UserSchema.mutation}
    ${CustomerSchema.mutation}
    ${OrderSchema.mutation}
  }

  ${UserSchema.definition}
  ${CustomerSchema.definition}
  ${OrderSchema.definition}
`;

// TODO read the version from the config
const RootResolvers = {
  Query: {
    version: () => '0.1',
  },
  Date: dateResolver,
};

const resolvers = objectAssignDeep({},
  RootResolvers,
  UserSchema.resolvers,
  CustomerSchema.resolvers,
  OrderSchema.resolvers
);

module.exports = makeExecutableSchema({
  typeDefs: SchemaDefinition,
  resolvers: resolvers,
});
