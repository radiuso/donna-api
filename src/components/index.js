const AuthSchema = require('./auth/authSchema');
const CustomerSchema = require('./customers/customerSchema');
const OrderSchema = require('./orders/orderSchema');
const ProductSchema = require('./products/productSchema');
const UserSchema = require('./users/userSchema');

module.exports = [
  AuthSchema,
  CustomerSchema,
  OrderSchema,
  ProductSchema,
  UserSchema,
];