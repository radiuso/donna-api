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
}

const graphqlQuery = async (query) => {
  const response = await request({
    baseUrl: `http://localhost:${app.address().port}`,
    uri: '/graphql',
    qs: {
      query,
    },
    resolveWithFullResponse: true,
    json: true,
  });

  if (response.errors) {
    logger.error(response.errors);
  }

  return response;
}

module.exports = {
  start,
  stop,
  graphqlQuery
};
