const graphqlHTTP = require('express-graphql');
const cors = require('cors');

const { env } = require('./config');
const schema = require('./schema');

module.exports = (app) => {
  app.use(cors());
  // init graphql route
  app.post('/graphql', graphqlHTTP((request) => ({
    schema: schema,
    graphiql: false,
    context: {
      request,
    },
    formatError: error => ({
      message: error.message,
      state: error.originalError && error.originalError.state,
      locations: error.locations,
      path: error.path,
    }),
  })));

  app.get('/graphql', graphqlHTTP((request) => ({
    schema: schema,
    graphiql: env === 'development',
    context: {
      request,
    },
    formatError: error => ({
      message: error.message,
      state: error.originalError && error.originalError.state,
      locations: error.locations,
      path: error.path,
    }),
  })));

  // if no route match, return 404
  app.route('/*').get((req, res) => {
    res.status(404).json({ error: 'This feature is not yet available.' });
  });
}
