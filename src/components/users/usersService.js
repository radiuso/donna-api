const DataLoader = require('dataloader');
const userDAL = require('./userDAL');

const findAll = () => userDAL.findAll();

const findByIdLoader = new DataLoader(
  (ids) => userDAL.findAllByIds(ids)
);

const create = (user) => userDAL.create(user);
const update = (id, user) => userDAL.update(id, user);

module.exports = {
  findAll,
  findByIdLoader,
  create,
  update,
};
