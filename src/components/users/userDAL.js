const { User } = require('../../database');

const findAll = () => User.findAll();
const findById = (id) => User.findById(id);
const findAllByIds = (ids) => User.findAll({
  where: {
    id: ids,
  },
});

// create a user
const create = (user) => User.create(user);

// update the user and return all fields from db
const update = (id, user) => User.update(user, {
  where: {
    id,
  },
}).then(() => findById(id));

module.exports = {
  findAll,
  findAllByIds,
  create,
  update,
};
