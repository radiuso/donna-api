const usersService = require('./usersService');

const userSchema = {
  definition: `
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
  `,
  query: `
    users: [User]!
    user(id: Int!): User
  `,
  mutation: `
    createUser(user: UserInput!): UserPayload
    updateUser(id: Int!, user: UserInput!): UserPayload
  `,
  resolvers: {
    User: {
      fullName: (user) => `${user.lastName} ${user.firstName}`,
    },
    Query: {
      users: () => usersService.findAll(),
      user: (obj, { id }) => usersService.findByIdLoader().load(id),
    },
    Mutation: {
      createUser: (obj, { user }) => usersService.create(user),
      updateUser: (obj, { id, user }) => usersService.update(id, user),
    },
  },
};


module.exports = userSchema;
