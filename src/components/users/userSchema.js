const UserType = require('./userType');
const { findAll, findOne } = require('./usersService');

const UserQuery = `
extend type Query {
  users: [User]!
  user(id: Int!): User
}
`;

const queryResolvers = {
  users: () => findAll(),
  user: (obj, { id }, context) => findOne(id),
};

module.exports = {
  typeDefs: [UserType, UserQuery],
  resolvers: {
    Query: queryResolvers,
  }
};
