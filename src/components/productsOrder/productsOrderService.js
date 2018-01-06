const DataLoader = require('dataloader');
const groupBy = require('lodash/groupBy');
const BaseService = require('../base_component/BaseService');
const productsOrderDAL = require('./productsOrderDAL');

class ProductsOrderService extends BaseService {
  constructor() {
    super('productsOrder', productsOrderDAL);

    this.findAllByOrderIdLoader = new DataLoader(
      (orderIds) =>  {
        const res = productsOrderDAL.findAllByOrderId(orderIds);
        return res.then(data => {
          const group =  groupBy(data, (po) => po.orderId);

          return group;
        });
      }
    );
  }
}

module.exports = new ProductsOrderService();
