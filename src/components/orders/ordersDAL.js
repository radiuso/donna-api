const BaseDAL = require('../base_component/BaseDAL');
const { Order } = require('../../database');

class OrdersDAL extends BaseDAL {
  constructor() {
    super(Order);
  }

  findAllByCustomerIds(customerIds) {
    return this.Entity.findAll({
      where: {
        customerId: customerIds,
      },
    });
  }
}

module.exports = new OrdersDAL();
