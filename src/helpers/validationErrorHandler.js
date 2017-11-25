const ValidationError = require('../errors/ValidationError');
module.exports = (data) => {
  const errors = [];

  if (data.errors !== undefined) {
    data.errors.forEach(error => {
      errors.push({
        key: error.path,
        rule: error.validatorKey,
        message: error.message,
      });
    });

    throw new ValidationError(errors);
  }

  throw data;
};