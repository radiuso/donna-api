const config = require('../config');
const db = require('../database');
const usersSeed = require('../components/users/usersSeed');
const logger = require('./logger');

const seed = () => {
  // Independent seeds first
  return db.sequelize.sync()
    .then(() => Promise.all([
      usersSeed(config.seed.users),
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
