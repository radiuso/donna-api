const Sequelize = require('sequelize');
const config = require('./config');
const UserModel = require('./components/users/userModel');
const CustomerModel = require('./components/customers/customerModel');
const Order = require('./components/orders/orderModel');
const Product = require('./components/products/productModel');

const { user, password, database, options } = config.db;

const db = {
  Sequelize,
  sequelize: new Sequelize(database, user, password, options),
};

db.User = db.sequelize.import('user', UserModel);
db.Customer = db.sequelize.import('customer', CustomerModel);
db.Order = db.sequelize.import('order', Order);
db.Product = db.sequelize.import('product', Product);

// association
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
