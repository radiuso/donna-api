const { User } = require('../../database');

module.exports.findAll = () => User.findAll();
module.exports.findById = (id) => User.findById(id);

module.exports.findAllByIds = (ids) => User.findAll({
  where: {
    id: ids,
  },
});

module.exports.create = (user) => User.create(user);