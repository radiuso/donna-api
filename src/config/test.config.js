module.exports = {
  env: 'test',
  server: {
    port: 9000,
  },
  db: {
    options: {
      host: 'localhost',
      dialect: 'sqlite',
      storage: '/data/donna_test.db',
      logging: false,
    }
  },
  seed: {
    users: {
      truncate: true,
      numberOfElements: 10,
    }
  },
};