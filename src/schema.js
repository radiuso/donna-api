const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
} = require('graphql');

const { User, Order } = require('./database');

const UserType = require('./components/users/userType');
const OrderType = require('./components/orders/orderType');
const CustomerType = require('./components/customers/customerType');

const UserQueryRootType = new GraphQLObjectType({
  name: 'UserAppSchema',
  description: "User Application Schema Query Root",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      description: "List of all Users",
      resolve: function() {
        return User.findAll();
      }
    },
    orders: {
      type: new GraphQLList(OrderType),
      description: 'List of all orders',
      resolve: function() {
        return Order.findAll();
      }
    },
  })
});

const UserAppSchema = new GraphQLSchema({
  query: UserQueryRootType
});

module.exports = UserAppSchema;
