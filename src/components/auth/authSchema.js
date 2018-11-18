const BaseSchema = require('../base_component/BaseSchema');
const authService = require('./authService');

class AuthSchema extends BaseSchema {
  get requireAuth() {
    return false;
  }

  get definition() {
    return `
      type AuthPayload {
        token: String
      }
    `;
  }

  get query() {
    return `
      login(username: String!, password: String!): AuthPayload
      authenticate(token: String!): AuthPayload
    `;
  }

  get mutation() {
    return `
      login(username: String!, password: String!): AuthPayload
      authenticate(token: String!): AuthPayload
    `;
  }

  get resolvers() {
    return {
      Query: {
        login: (obj, { username, password }, context) => authService.login(username, password, context),
        authenticate: (obj, { token }, context) => authService.authenticate(token, context),
      },
      Mutation: {
        login: (obj, { username, password }, context) => authService.login(username, password, context),
        authenticate: (obj, { token }, context) => authService.authenticate(token, context),
      },
    };
  }
}

module.exports = new AuthSchema();
