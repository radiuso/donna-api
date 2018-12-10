const groupBy = require('lodash/groupBy');
const DataLoader = require('dataloader');
const format = require('date-fns/format');
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
        // ensure each index is aligned with the original key
        customerIds.forEach(id => {
          orders.push(orderGroups[id] || []);
        });

        return orders;
      }
    );
  }

  findByDateLoader() {
    return new DataLoader(async (dates) => {
      const ordersForDays = await ordersDAL.findAllByDates(dates)
      const orderGroups = groupBy(ordersForDays, entity => format(entity.targetDate, 'YYYYMMDD'))
      const orders = []

      dates.forEach(date => {
        orders.push(orderGroups[format(date, 'YYYYMMDD')] || []);
      })

      return orders
    })
  }

  create(entity) {
    if (entity.status === undefined) {
      entity.status = 1;
    }

    return super.create(entity);
  }
}

module.exports = new OrdersService();
