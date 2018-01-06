const BaseDAL = require('../base_component/BaseDAL');
const { ProductsOrder } = require('../../database');

class ProductsOrderDAL extends BaseDAL {
  constructor() {
    super(ProductsOrder);
  }

  findAllByOrderId(orderIds) {
    return this.Entity.findAll({
      where: {
        orderId: orderIds,
      },
    });
  }
}

module.exports = new ProductsOrderDAL();
