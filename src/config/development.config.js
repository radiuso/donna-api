module.exports = {
  db: {
    options: {
      host: 'localhost',
      dialect: 'sqlite',
      storage: '/data/donna.db',
      logging: console.log,
    }
  },
  seed: {
    users: {
      truncate: true,
      numberOfElements: 10,
    }
  },
};