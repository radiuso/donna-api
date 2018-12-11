const request = require('request-promise');
const server = require('../server');
const logger = require('../helpers/logger');

let app = null;
let tokens = {
  admin: null,
  app: null,
};

const start = async () => {
  app = await server;

  try {
    const response = await graphqlQuery(`{
      login(username: "admin@donna.com", password: "securepwd") {
        token
      }
    }`);

    tokens.admin = response.body.data.login.token;
  } catch (ex) {
    console.info('Cannot get token');

    throw ex;
  }

  return;
};

const stop = async () => {
  app.close();
  tokens = {
    admin: null,
    app: null,
  };

  return;
};

const graphqlMutation = async (query, variables) => {
  const response = await request({
    method: 'POST',
    baseUrl: `http://localhost:${app.address().port}`,
    uri: '/graphql',
    body: {
      query,
      variables,
    },
    resolveWithFullResponse: true,
    json: true,
    headers: {
      authorization: tokens.admin,
    }
  });

  if (response.errors) {
    logger.error(response.errors);
  }

  return response;
};

const graphqlQuery = async (query, variables) => {
  const response = await request({
    baseUrl: `http://localhost:${app.address().port}`,
    uri: '/graphql',
    qs: {
      query,
      variables,
    },
    resolveWithFullResponse: true,
    json: true,
    headers: {
      authorization: tokens.admin,
    },
  });

  if (response.errors) {
    logger.error(response.errors);
  }

  return response;
};

module.exports = {
  start,
  stop,
  graphqlQuery,
  graphqlMutation,
};
