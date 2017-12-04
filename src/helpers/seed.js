const config = require('../config');
const db = require('../database');
const logger = require('./logger');
const usersSeed = require('../components/users/usersSeed');
const customersSeed = require('../components/customers/customersSeed');
const ordersSeed = require('../components/orders/ordersSeed');
const productsSeed = require('../components/products/productsSeed');
const productsOrderSeed = require('../components/productsOrder/productsOrderSeed');

const seed = () => {
  // Independent seeds first
  return db.sequelize.sync()
    .then(() => Promise.all([
      usersSeed(config.seed.users),
      customersSeed(config.seed.customers),
      ordersSeed(config.seed.orders, config.seed.customers),
      productsSeed(config.seed.products),
    ]))
    .then(() => {
      // More seeds that require IDs from the seeds above
      productsOrderSeed(config.seed.productsOrder, config.seed.orders, config.seed.customers);
    })
    .then(() => {
      logger.info(`The database for the "${config.env}" environment is now seeded`);
    })
    .catch(err => {
      logger.error(err);
    });
};

module.exports = seed;
