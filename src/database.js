const Sequelize = require('sequelize');
const config = require('./config');
const User = require('./components/users/user');

const { user, password, database, options } = config.db;

const db = {
  Sequelize,
  sequelize: new Sequelize(database, user, password, options),
};

db.User = db.sequelize.import('user', User);

// association
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
