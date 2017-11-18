const CustomerType = require('../customers/customerType');

const OrderType = `
type Order {
  id: Int!
  targetDate: String
  status: String!
  customer: [Customer]!
}
`;

module.exports = [OrderType, CustomerType];
