const BaseSchema = require('../base_component/BaseSchema');
const ordersService = require('./ordersService');
const customersService = require('../customers/customersService');

class OrderSchema extends BaseSchema {
  get definition() {
    return `
      type Order {
        id: Int!
        targetDate: Date
        status: Int!
        customer: Customer
      }

      type OrderPayload {
        order: Order
      }

      input OrderInput {
        targetDate: Date
        status: Int!
        customerId: Int!
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
