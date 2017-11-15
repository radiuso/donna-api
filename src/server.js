const express = require('express');
const initRoutes = require('./routes');

const app = express();

// create routes
initRoutes(app);

app.listen(3000, function () {
  console.log('donna api is listening on port 3000!')
});