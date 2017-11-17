const express = require('express');
const graphqlHTTP = require('express-graphql');

const db = require('./database');
const errorHandlerMiddleware = require('./middleware/errorHandler');
const schema = require('./schema');
const initRoutes = require('./routes');

const app = express();

// create routes
app.use('/', graphqlHTTP({
  schema: schema,
  graphiql: true //Set to false if you don't want graphiql enabled
}));

// initRoutes(app);

// handle error
app.use(errorHandlerMiddleware);

db.sequelize.sync()
  .then(() => {
    return app.listen(3000, () => {
      console.log('donna api is listening on port 3000!')
    });
  })
  .catch(function(err) {
    console.log('Server failed to start due to error: %s', err);
  });
