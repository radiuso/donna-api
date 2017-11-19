const { GraphQLError } = require('graphql');

class ValidationError extends GraphQLError {
  constructor(errors) {
    super('The entity is not valid.');

    this.state = errors.reduce((result, error) => {
      const formattedError = {
        rule: error.rule,
        message: error.message,
      };

      // merge errors
      if (Object.prototype.hasOwnProperty.call(result, error.key)) {
        result[error.key].push(formattedError);
      } else {
        result[error.key] = [formattedError];
      }

      return result;
    }, {});
  }
}

module.exports = ValidationError;
