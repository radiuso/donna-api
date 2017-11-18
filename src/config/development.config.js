module.exports = {
  db: {
    options: {
      host: 'localhost',
      dialect: 'sqlite',
      storage: '/data/donna.db',
    }
  },
  seed: {
    users: {
      truncate: true,
      numberOfElements: 10,
    }
  },
};