const AuthSchema = require('./auth/authSchema');
const CustomerSchema = require('./customers/customerSchema');
const OrderSchema = require('./orders/orderSchema');
const ProductSchema = require('./products/productSchema');
const ProductsOrderSchema = require('./productsOrder/productsOrderSchema');
const UserSchema = require('./users/userSchema');
const CategorySchema = require('./categories/categorySchema');

module.exports = [
  AuthSchema,
  ProductsOrderSchema,
  CustomerSchema,
  OrderSchema,
  ProductSchema,
  UserSchema,
  CategorySchema,
];