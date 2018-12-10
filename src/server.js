const express = require('express');
const errorHandlerMiddleware = require('./middleware/errorHandler');
const routes = require('./routes');
const db = require('./database');
const logger = require('./helpers/logger');
const config = require('./config');

// create server
const app = express();

// create routes
routes(app);

// handle error
app.use(errorHandlerMiddleware);

module.exports = (async () => {
  try {
    const { port } = config.server;

    // sync db and start the server
    await db.sequelize.sync();

    return app.listen(port, () => {
      logger.info(`donna api is listening on port ${port}!`)
    });
  } catch (err) {
    logger.info('Server failed to start due to error: %s', err);
  }
})();
