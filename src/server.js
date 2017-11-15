const express = require('express');
const errorHandlerMiddleware = require('./middleware/errorHandler');
const initRoutes = require('./routes');

const app = express();

// create routes
initRoutes(app);

// handle error
app.use(errorHandlerMiddleware);

app.listen(3000, () => {
  console.log('donna api is listening on port 3000!')
});