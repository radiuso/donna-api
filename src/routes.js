const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

module.exports = (app) => {
  // init graphql route
  app.use('/graphapi', graphqlHTTP({
    schema: schema,
    graphiql: true,
  }));

  // if no route match, return 404
  app.route('/*').get((req, res) => {
    res.status(404).json({ error: 'This feature is not yet available.' });
  });
}
