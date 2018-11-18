const config = require('../config');
const db = require('../database');
const logger = require('./logger');
const usersSeed = require('../components/users/usersSeed');
const customersSeed = require('../components/customers/customersSeed');
const ordersSeed = require('../components/orders/ordersSeed');
const productsSeed = require('../components/products/productsSeed');
const productsOrderSeed = require('../components/productsOrder/productsOrderSeed');

const seed = async () => {
  try {
    // Independent seeds first
    await db.sequelize.sync();
    const [users, customers, orders, products] = await Promise.all([
      usersSeed(config.seed.users),
      customersSeed(config.seed.customers),
      ordersSeed(config.seed.orders, config.seed.customers),
      productsSeed(config.seed.products),
    ]);

    // More seeds that require IDs from the seeds above
    await productsOrderSeed(config.seed.productsOrder, orders, customers);

    logger.info(`The database for the "${config.env}" environment is now seeded`);
  } catch(err) {
      logger.error(err);
  }
};

module.exports = seed;
