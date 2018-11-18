const { makeExecutableSchema } = require('graphql-tools');
const objectAssignDeep = require('object-assign-deep');
const { GraphQLDateTime, GraphQLDate } = require('graphql-iso-date');
const components = require('./components');
const graphAuthMiddleware = require('./middleware/graphAuthMiddleware');

const RootResolvers = {
  Query: {
    version: () => '0.1',
  },
  DateTime: GraphQLDateTime,
  Date: GraphQLDate,
};

let resolvers = objectAssignDeep({}, RootResolvers);
let queries = '';
let mutations = '';
let definitions = '';

components.forEach((component) => {
  let componentResolvers = component.resolvers;

  if (component.requireAuth) {
    componentResolvers = graphAuthMiddleware.apply(componentResolvers);
  }

  resolvers = objectAssignDeep(resolvers, componentResolvers);

  queries += component.query;
  mutations += component.mutation;
  definitions += component.definition;
});

const SchemaDefinition = `
  scalar DateTime
  scalar Date

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
