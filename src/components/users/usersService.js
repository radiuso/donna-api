const userDAL = require('./userDAL');

module.exports.findAll = () => {
  return userDAL.findAll();
};
