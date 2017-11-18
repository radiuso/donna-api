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
    ${UserSchema.query.type}
  }

  type Mutation {
    ${UserSchema.mutation.type}
  }
`;

// TODO read the version from the config
const RootResolvers = {
  Query: {
    version: () => '0.1',
  }
}

// build resolvers from schema
const getSchemaResolvers = (schema) => {
  return {
    Query: schema.query.resolvers,
    Mutation: schema.mutation.resolvers,
  };
}

const resolvers = objectAssignDeep({},
  RootResolvers,
  getSchemaResolvers(UserSchema)
);

const typeDefs = [SchemaDefinition].concat(
  UserSchema.typeDefs
);

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
