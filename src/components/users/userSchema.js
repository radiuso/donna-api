const userService = require('./usersService');

const userSchema = {
  definition: `
    type User {
      id: Int!
      firstName: String
      lastName: String
      fullName: String
    }

    input UserInput {
      id: Int
      firstName: String!
      lastName: String!
    }
  `,
  query: `
    users: [User]!
    user(id: Int!): User
  `,
  mutation: `
    createUser(user: UserInput): User
  `,
  resolvers: {
    User: {
      fullName: (user) => `${user.lastName} ${user.firstName}`,
    },
    Query: {
      users: () => userService.findAll(),
      user: (obj, { id }, context) => userService.findByIdLoader.load(id),
    },
    Mutation: {
      createUser: (obj, { user }, context) => userService.create(user),
    },
  },
};


module.exports = userSchema;
