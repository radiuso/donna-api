const BaseService = require('../base_component/BaseService');
const ordersDAL = require('./ordersDAL');

class OrdersService extends BaseService {
  constructor() {
    super('order', ordersDAL);
  }
}

module.exports = new OrdersService();
