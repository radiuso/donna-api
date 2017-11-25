const BaseDAL = require('../base_component/BaseDAL');
const { Order } = require('../../database');

class OrdersDAL extends BaseDAL {
  constructor() {
    super(Order);
  }
}

module.exports = new OrdersDAL();
