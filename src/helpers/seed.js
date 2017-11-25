const config = require('../config');
const db = require('../database');
const logger = require('./logger');
const usersSeed = require('../components/users/usersSeed');
const customersSeed = require('../components/customers/customersSeed');

const seed = () => {
  // Independent seeds first
  return db.sequelize.sync()
    .then(() => Promise.all([
      usersSeed(config.seed.users),
      customersSeed(config.seed.customers),
    ]))
    .then(() => {
      // More seeds that require IDs from the seeds above
    })
    .then(() => {
      logger.info(`The database for the "${config.env}" environment is now seeded`);
    })
    .catch(err => {
      logger.error(err);
    });
};

module.exports = seed;
