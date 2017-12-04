const { makeExecutableSchema } = require('graphql-tools');
const objectAssignDeep = require('object-assign-deep');
const { GraphQLDateTime } = require('graphql-iso-date');
const components = require('./components');

const RootResolvers = {
  Query: {
    version: () => '0.1',
  },
  DateTime: GraphQLDateTime,
};

let resolvers = objectAssignDeep({}, RootResolvers);
let queries = '';
let mutations = '';
let definitions = '';

components.forEach((component) => {
  resolvers = objectAssignDeep(resolvers, component.resolvers);
  queries += component.query;
  mutations += component.mutation;
  definitions += component.definition;
});

const SchemaDefinition = `
  scalar DateTime

  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    version: String!
    ${queries}
  }

  type Mutation {
    ${mutations}
  }

  ${definitions}
`;

module.exports = makeExecutableSchema({
  typeDefs: SchemaDefinition,
  resolvers: resolvers,
});
