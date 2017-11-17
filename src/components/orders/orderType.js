const {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const CustomerType = require('../customers/customerType');
const Customer = require('../customers/customer');

const OrderType = new GraphQLObjectType({
  name: "Order",
  description: "This represent an order",
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLInt)},
    targetDate: {type: new GraphQLNonNull(GraphQLString)},
    status: {type: new GraphQLNonNull(GraphQLInt)},
    customer: {
      type: CustomerType,
      resolve: function(order) {
        return Customer.findOne(order.customer_id);
      }
    }
  }),
});

module.exports = OrderType;
