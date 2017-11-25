const ordersService = require('./ordersService');
const customersService = require('../customers/customersService');

const orderSchema = {
  definition: `
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
  `,
  query: `
    orders: [Order]!
    order(id: Int!): Order
  `,
  mutation: `
    createOrder(order: OrderInput!): OrderPayload
    updateOrder(id: Int!, order: OrderInput!): OrderPayload
  `,
  resolvers: {
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
  },
};


module.exports = orderSchema;
