const DataLoader = require('dataloader');
const userDAL = require('./userDAL');

module.exports.findAll = () => userDAL.findAll();

module.exports.findByIdLoader = new DataLoader(
  (ids) => userDAL.findAllByIds(ids)
);
