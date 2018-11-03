const groupBy = require('lodash/groupBy');
const DataLoader = require('dataloader');

const BaseService = require('../base_component/BaseService');
const ordersDAL = require('./ordersDAL');

class OrdersService extends BaseService {
  constructor() {
    super('order', ordersDAL);

    this.findAllByCustomerIdLoader = new DataLoader(
      async (customerIds) => {
        const allOrders = await ordersDAL.findAllByCustomerIds(customerIds);
        const orderGroups = groupBy(allOrders, (entity) => entity.customerId);

        const orders = [];
        // ensure each index aligns with the original keys
        customerIds.forEach(id => {
          orders.push(orderGroups[id]);
        });

        return orders;
      }
    );
  }

  create(entity) {
    if (entity.status === undefined) {
      entity.status = 1;
    }

    return super.create(entity);
  }
}

module.exports = new OrdersService();
