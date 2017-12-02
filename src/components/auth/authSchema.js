const BaseSchema = require('../base_component/BaseSchema');
const authService = require('./authService');

class AuthSchema extends BaseSchema {
  get definition() {
    return `
      type AuthPayload {
        token: String
      }
    `;
  }

  get query() {
    return `
      authenticate(username: String!, password: String!): AuthPayload
    `;
  }

  get mutation() {
    return `
      authenticate(username: String!, password: String!): AuthPayload
    `;
  }

  get resolvers() {
    return {
      Query: {
        authenticate: (obj, { username, password }, context) => authService.authenticate(username, password, context),
      },
      Mutation: {
        authenticate: (obj, { username, password }, context) => authService.authenticate(username, password, context),
      },
    };
  }
}

module.exports = new AuthSchema();
