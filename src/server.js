const express = require('express');
const errorHandlerMiddleware = require('./middleware/errorHandler');
const routes = require('./routes');
const db = require('./database');
const logger = require('./helpers/logger');

// create server
const app = express();

// create routes
routes(app);

// handle error
app.use(errorHandlerMiddleware);

// sync db and start the server
db.sequelize.sync()
  .then(() => {
    return app.listen(8080, () => {
      logger.info('donna api is listening on port 8080!')
    });
  })
  .catch(function(err) {
    logger.info('Server failed to start due to error: %s', err);
  });
