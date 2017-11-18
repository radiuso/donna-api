const { User } = require('../../database');

class UsersDAL {
  findAll() {
    return User.findAll();
  }

  findById(id) {
    return User.findById(id);
  }

  findAllByIds(ids) {
    return User.findAll({
      where: {
        id: ids,
      },
    });
  }

  create(user) {
    return User.create(user);
  }

  update(id, user) {
    return User.update(user, {
      where: {
        id,
      },
    });
  }
}

module.exports = new UsersDAL();
