const userDAL = require('./userDAL');

module.exports.findAll = () => userDAL.findAll();

module.exports.findOne = (id) => userDAL.findOne(id);
