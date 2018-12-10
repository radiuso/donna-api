const request = require('request-promise');
const server = require('../server');
const logger = require('../helpers/logger');

let app = null;

const start = async () => {
  app = await server;
  return;
};

const stop = async () => {
  app.close();

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
