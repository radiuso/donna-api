const { Customer } = require('../../database');

class CustomersDAL {
  findAll() {
    return Customer.findAll();
  }

  findById(id) {
    return Customer.findById(id);
  }

  findAllByIds(ids) {
    return Customer.findAll({
      where: {
        id: ids,
      },
    });
  }

  create(user) {
    return Customer.create(user);
  }

  update(id, user) {
    return Customer.update(user, {
      where: {
        id,
      },
    });
  }
}

module.exports = new CustomersDAL();
