const BaseSchema = require('../base_component/BaseSchema');
const ordersService = require('./ordersService');
const customersService = require('../customers/customersService');
const productsOrderService = require('../productsOrder/productsOrderService');

class OrderSchema extends BaseSchema {
  get definition() {
    return `
      type Order {
        id: Int!
        targetDate: DateTime
        status: Int!
        customer: Customer
        products: ProductsOrder
      }

      type OrderPayload {
        order: Order
      }

      input OrderInput {
        targetDate: DateTime
        status: Int
        customerId: Int!
        products: [ProductsOrderInput!]!
      }
    `;
  }

  get query() {
    return `
      orders: [Order]!
      order(id: Int!): Order
    `;
  }

  get mutation() {
    return `
      createOrder(order: OrderInput!): OrderPayload
      updateOrder(id: Int!, order: OrderInput!): OrderPayload
    `;
  }

  get resolvers() {
    return {
      Order: {
        customer: (obj) => customersService.findByIdLoader.load(obj.customerId),
        products: (obj) => productsOrderService.findAllByOrderIdLoader.load(obj.id),
      },
      Query: {
        orders: () => ordersService.findAll(),
        order: (obj, { id }) => ordersService.findByIdLoader.load(id),
      },
      Mutation: {
        createOrder: (obj, { order }) => ordersService.create(order),
        updateOrder: (obj, { id, order }) => ordersService.update(id, order),
      },
    };
  }
}

module.exports = new OrderSchema();
