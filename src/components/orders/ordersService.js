const BaseService = require('../base_component/BaseService');
const ordersDAL = require('./ordersDAL');

class OrdersService extends BaseService {
  constructor() {
    super('order', ordersDAL);
  }

  create(entity) {
    if (entity.status === undefined) {
      entity.status = 1;
    }

    return super.create(entity);
  }
}

module.exports = new OrdersService();
