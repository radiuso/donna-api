const { Op } = require('sequelize');
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

  truncate() {
    return this.Entity.destroy({
      where: {
        orderId: { [Op.gt]: 0 },
      },
    });
  }
}

module.exports = new ProductsOrderDAL();
