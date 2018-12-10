const DataLoader = require('dataloader');
const groupBy = require('lodash/groupBy');
const BaseService = require('../base_component/BaseService');
const productsOrderDAL = require('./productsOrderDAL');

class ProductsOrderService extends BaseService {
  constructor() {
    super('productsOrder', productsOrderDAL);

    this.findAllByOrderIdLoader = new DataLoader(async (orderIds) => {
        const data = await productsOrderDAL.findAllByOrderId(orderIds);
        const group = groupBy(data, (po) => po.orderId);
        const res = [];

        orderIds.forEach(orderId => {
          res.push(group[orderId] || {});
        })

        return res;
    });

    this.sumOrdersProductsPricesLoader = new DataLoader(async (orderIds) => {
      const data = await productsOrderDAL.sumOrdersProductsPrices(orderIds);
      const group = groupBy(data, po => po.orderId);
      const res = [];

      orderIds.forEach(orderId => {
        const orderGroup = group[orderId];
        let total = 0;

        if (orderGroup) {
          const d = orderGroup[0].toJSON();
          total = d.totalPrice;
        }

        res.push(total);
      })

      return res;
    });
  }
}

module.exports = new ProductsOrderService();
