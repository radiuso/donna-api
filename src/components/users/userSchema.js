const UserType = require('./userType');
const { findAll, findByIdLoader, save } = require('./usersService');

// queries
const userQuery = `
  users: [User]!
  user(id: Int!): User
`;
const queryResolvers = {
  users: () => findAll(),
  user: (obj, { id }, context) => findByIdLoader.load(id),
};

// mutations
const userMutation = `
  createUser(lastName: String!, firstName: String!): User
`;
const mutationResolvers = {
  createUser: (obj, data, context) => save(data),
};

module.exports = {
  query: {
    type: userQuery,
    resolvers: queryResolvers,
  },
  mutation: {
    type: userMutation,
    resolvers: mutationResolvers,
  },
  typeDefs: [UserType],
};
