const usersAPI = require('./components/users/usersAPI');

module.exports = (app) => {
  app.use('/api/users', usersAPI);

  // if no route match, return 404
  app.route('/*').get((req, res) => {
    res.status(404).json({ error: 'This feature is not yet available.' });
  });
}
