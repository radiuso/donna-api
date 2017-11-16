const Sequelize = require('sequelize');
const config = require('./config');
const User = require('./components/users/user');

const { user, password, database, options } = config.db;

const db = {
  Sequelize,
  sequelize: new Sequelize(database, user, password, options),
};

// Insert models below
db.User = db.sequelize.import('user', User);

module.exports = db;