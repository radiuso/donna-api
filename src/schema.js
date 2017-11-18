const { makeExecutableSchema } = require('graphql-tools');
const objectAssignDeep = require('object-assign-deep');

const UserSchema = require('./components/users/userSchema');

const RootQuery = `
  type Query {
    version: String!
  }
`;

// TODO read the version from the config
const RootResolvers = {
  Query: {
    version: () => '0.1',
  }
}

const SchemaDefinition = `
  schema {
    query: Query
  }
`;

const rootTypeDefs = [SchemaDefinition, RootQuery];

const resolvers = objectAssignDeep({}, RootResolvers, UserSchema.resolvers);
const typeDefs = rootTypeDefs.concat(UserSchema.typeDefs);

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
