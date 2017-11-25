const { Order } = require('../../database');

class OrdersDAL {
  findAll() {
    return Order.findAll();
  }

  findById(id) {
    return Order.findById(id);
  }

  findAllByIds(ids) {
    return Order.findAll({
      where: {
        id: ids,
      },
    });
  }

  create(user) {
    return Order.create(user);
  }

  update(id, user) {
    return Order.update(user, {
      where: {
        id,
      },
    });
  }
}

module.exports = new OrdersDAL();
