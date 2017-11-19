const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

module.exports = (app) => {
  // init graphql route
  app.use('/graphapi', graphqlHTTP({
    schema: schema,
    graphiql: true,
    formatError: error => ({
      message: error.message,
      state: error.originalError && error.originalError.state,
      locations: error.locations,
      path: error.path,
    }),
  }));

  // if no route match, return 404
  app.route('/*').get((req, res) => {
    res.status(404).json({ error: 'This feature is not yet available.' });
  });
}
