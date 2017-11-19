const logger = require('../helpers/logger');

const errorHandler = (err, req, res) => {
  const statusCode = err.statusCode || 500;
  logger.error(err.stack);

  if (req.app.get('env') !== 'development') {
    delete err.stack;
  }

  res.status(statusCode).json({ error: {
    code: statusCode,
    message: err.errors,
    stack: err.stack,
    error: err.errors,
  }});
};

module.exports = errorHandler;
