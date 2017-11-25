const customersService = require('./customersService');

const customerSchema = {
  definition: `
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
  `,
  query: `
    customers: [Customer]!
    customer(id: Int!): Customer
  `,
  mutation: `
    createCustomer(order: CustomerInput!): CustomerPayload
    updateCustomer(id: Int!, customer: CustomerInput!): CustomerPayload
  `,
  resolvers: {
    Customer: {
    },
    Query: {
      customers: () => customersService.findAll(),
      customer: (obj, { id }) => customersService.findByIdLoader().load(id),
    },
    Mutation: {
      createCustomer: (obj, { customer }) => customersService.create(customer),
      updateCustomer: (obj, { id, customer }) => customersService.update(id, customer),
    },
  },
};


module.exports = customerSchema;
