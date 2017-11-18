const { makeExecutableSchema } = require('graphql-tools');
const objectAssignDeep = require('object-assign-deep');

const UserSchema = require('./components/users/userSchema');

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    version: String!
    ${UserSchema.query}
  }

  type Mutation {
    ${UserSchema.mutation}
  }

  ${UserSchema.definition}
`;

// TODO read the version from the config
const RootResolvers = {
  Query: {
    version: () => '0.1',
  }
}

const resolvers = objectAssignDeep({},
  RootResolvers,
  UserSchema.resolvers
);

module.exports = makeExecutableSchema({
  typeDefs: SchemaDefinition,
  resolvers: resolvers,
});
