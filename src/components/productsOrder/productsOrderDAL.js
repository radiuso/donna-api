const { Op, fn, literal } = require('sequelize');
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

  async sumOrdersProductsPrices(orderIds) {
    return this.Entity.findAll({
      attributes: [
        'orderId',
        [fn('SUM', literal('(unitPrice * quantity)')), 'totalPrice'],
      ],
      where: {
        orderId: orderIds,
      },
      group: ['orderId'],
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
