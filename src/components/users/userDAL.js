const User = require('../../database').User;

module.exports.findAll = () => {
  return User.findAll();
};
