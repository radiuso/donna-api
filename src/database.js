const Sequelize = require('sequelize');
const config = require('./config');
const UserModel = require('./components/users/userModel');
// const Customer = require('./components/customers/customer');
// const Order = require('./components/orders/order');

const { user, password, database, options } = config.db;

const db = {
  Sequelize,
  sequelize: new Sequelize(database, user, password, options),
};

db.User = db.sequelize.import('user', UserModel);
// db.Customer = db.sequelize.import('customer', Customer);
// db.Order = db.sequelize.import('order', Order);

// association
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
