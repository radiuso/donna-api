const BaseDAL = require('../base_component/BaseDAL');
const { Order, ProductsOrder } = require('../../database');

class OrdersDAL extends BaseDAL {
  constructor() {
    super(Order);
  }

  findAllByCustomerIds(customerIds) {
    return this.Entity.findAll({
      where: {
        customerId: customerIds,
      },
    });
  }

  findAllByDates(dates) {
    return this.Entity.findAll({
      where: {
        concernDate: dates,
      },
      order: [['targetDate', 'ASC']],
    })
  }

  async create(entity) {
    const order = await this.Entity.create(entity);

    // create products
    const productsOrder = entity.productsOrder;
    productsOrder.forEach(po => po.orderId = order.id);

    await ProductsOrder.bulkCreate(productsOrder);

    return order;
  }
}

module.exports = new OrdersDAL();
