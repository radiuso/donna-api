const config = require('./config');
const db = require('./database');
const usersSeed = require('./components/users/usersSeed');

// Independent seeds first
db.sequelize.sync()
.then(() => Promise.all([
  usersSeed(config.seed.users),
]))
.then(() => {
  // More seeds that require IDs from the seeds above
  return '';
}).then(() => {
  console.log('The database is now seeded');
}).catch(err => {
  console.error(err);
});