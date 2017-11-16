const { User } = require('../../database');

module.exports.findAll = () => {
  return User.findAll();
};
