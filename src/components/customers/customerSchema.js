const BaseSchema = require('../base_component/BaseSchema');
const customersService = require('./customersService');
const ordersService = require('../orders/ordersService');

class CustomerSchema extends BaseSchema {
  get definition() {
    return `
      type Customer {
        id: Int!
        firstName: String!,
        lastName: String!,
        phone: String,
        city: String,
        street: String,
        zipCode: String,
        orders: [Order]
      }

      type CustomerPayload {
        customer: Customer
      }

      input CustomerInput {
        firstName: String!,
        lastName: String!,
        phone: String,
        city: String,
        street: String,
        zipCode: String
      }
    `;
  }

  get query() {
    return `
      customers: [Customer]!
      customer(id: Int!): Customer
    `;
  }

  get mutation() {
    return `
      createCustomer(customer: CustomerInput!): CustomerPayload
      updateCustomer(id: Int!, customer: CustomerInput!): CustomerPayload
    `;
  }

  get resolvers() {
    return {
      Customer: {
        orders: (obj) => ordersService.findAllByCustomerIdLoader.load(obj.id),
      },
      Query: {
        customers: () => customersService.findAll(),
        customer: (obj, { id }) => customersService.findByIdLoader.load(id),
      },
      Mutation: {
        createCustomer: (obj, { customer }) => customersService.create(customer),
        updateCustomer: (obj, { id, customer }) => customersService.update(id, customer),
      },
    };
  }
}

module.exports = new CustomerSchema();
