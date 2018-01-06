const express = require('express');
const { graphql } = require('graphql');
const request = require('request-promise');

const config = require('../config');
const rootSchema = require('../schema');
const seed = require('../helpers/seed');
const logger = require('../helpers/logger');

function start(done) {
  const { port } = config.server;

  const app = express();

  app.get('/graphql', (req, res) => {
    const graphqlQuery = req.query.graphqlQuery;
    if (!graphqlQuery) {
      return res.status(500).send('You must provide a query');
    }

    return graphql(rootSchema, graphqlQuery)
      .then(response => {
        if (response.errors) {
          logger.error(response.errors);
        }

        return response;
      })
      .then(response => response.data)
      .then(data => res.json(data))
      .catch(err => logger.error(err));
  });

  return app.listen(port, () => {
    return seed().then(() => {
      logger.info('Server started at port [%s]', port)
      done();
    });
  });
}

function stop(app, done) {
  app.close();
  done();
}

function graphqlQuery(app, query) {
  return request({
    baseUrl: `http://localhost:${app.address().port}`,
    uri: '/graphql',
    qs: {
      graphqlQuery : query
    },
    resolveWithFullResponse: true,
    json: true,
  })
  .then(response => {
    if (response.errors) {
      logger.error(response.errors);
    }

    return response;
  })
  .catch(err => logger.error(err));
}

module.exports = {
  start,
  stop,
  graphqlQuery
};
