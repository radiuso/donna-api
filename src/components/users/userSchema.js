const BaseSchema = require('../base_component/BaseSchema');
const usersService = require('./usersService');

class UserSchema extends BaseSchema {
  get definition() {
    return `
      type User {
        id: Int!
        email: String
        firstName: String
        lastName: String
        fullName: String
      }

      type UserPayload {
        user: User
      }

      input UserInput {
        email: String!
        firstName: String!
        lastName: String!
      }
    `;
  }

  get query() {
    return `
      users: [User]!
      user(id: Int!): User
    `;
  }

  get mutation() {
    return `
      createUser(user: UserInput!): UserPayload
      updateUser(id: Int!, user: UserInput!): UserPayload
    `;
  }

  get resolvers() {
    return {
      User: {
        fullName: (user) => `${user.lastName} ${user.firstName}`,
      },
      Query: {
        users: () => usersService.findAll(),
        user: (obj, { id }) => usersService.findByIdLoader.load(id),
      },
      Mutation: {
        createUser: (obj, { user }) => usersService.create(user),
        updateUser: (obj, { id, user }) => usersService.update(id, user),
      },
    };
  }
}

module.exports = new UserSchema();
