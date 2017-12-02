const graphqlHTTP = require('express-graphql');
const { env } = require('./config');
const schema = require('./schema');

module.exports = (app) => {
  // init graphql route
  app.use('/graphapi', graphqlHTTP((request) => ({
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
