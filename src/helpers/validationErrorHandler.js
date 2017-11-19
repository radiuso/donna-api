const ValidationError = require('../errors/ValidationError');
module.exports = (data) => {
  const errors = [];

  data.errors.forEach(error => {
    errors.push({
      key: error.path,
      rule: error.validatorKey,
      message: error.message,
    });
  });

  throw new ValidationError(errors);
};