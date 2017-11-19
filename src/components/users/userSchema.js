'use strict'
const userService = require('./usersService');

const userSchema = {
  definition: `
    type User {
      id: Int!
      email: String
      firstName: String
      lastName: String
      fullName: String
    }

    input UserInput {
      email: String!
      firstName: String!
      lastName: String!
    }
  `,
  query: `
    users: [User]!
    user(id: Int!): User
  `,
  mutation: `
    createUser(user: UserInput!): User
    updateUser(id: Int!, user: UserInput!): User
  `,
  resolvers: {
    User: {
      fullName: (user) => `${user.lastName} ${user.firstName}`,
    },
    Query: {
      users: () => userService.findAll(),
      user: (obj, { id }) => userService.findByIdLoader.load(id),
    },
    Mutation: {
      createUser: (obj, { user }) => userService.create(user),
      updateUser: (obj, { id, user }) => userService.update(id, user),
    },
  },
};


module.exports = userSchema;
