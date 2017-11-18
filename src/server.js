const express = require('express');
const errorHandlerMiddleware = require('./middleware/errorHandler');
const routes = require('./routes');
const db = require('./database');

// create server
const app = express();

// create routes
routes(app);

// handle error
app.use(errorHandlerMiddleware);

// sync db and start the server
db.sequelize.sync()
  .then(() => {
    return app.listen(3000, () => {
      console.log('donna api is listening on port 3000!')
    });
  })
  .catch(function(err) {
    console.log('Server failed to start due to error: %s', err);
  });
