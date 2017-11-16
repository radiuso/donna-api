const express = require('express');
const db = require('./database');
const errorHandlerMiddleware = require('./middleware/errorHandler');
const initRoutes = require('./routes');

const app = express();

// create routes
initRoutes(app);

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
