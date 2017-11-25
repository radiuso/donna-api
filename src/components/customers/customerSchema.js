const BaseSchema = require('../base_component/BaseSchema');
const customersService = require('./customersService');

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
        zipCode: String
      }

      type CustomerPayload {
        customer: Customer
      }

      input CustomerInput {
        targetDate: Date
        status: Int!
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
      createCustomer(order: CustomerInput!): CustomerPayload
      updateCustomer(id: Int!, customer: CustomerInput!): CustomerPayload
    `;
  }

  get resolvers() {
    return {
      Query: {
        customers: () => customersService.findAll(),
        customer: (obj, { id }) => customersService.findByIdLoader().load(id),
      },
      Mutation: {
        createCustomer: (obj, { customer }) => customersService.create(customer),
        updateCustomer: (obj, { id, customer }) => customersService.update(id, customer),
      }
    };
  }
}

module.exports = new CustomerSchema();
