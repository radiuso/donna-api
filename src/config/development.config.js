module.exports = {
  env: 'development',
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
    },
    customers: {
      truncate: true,
      numberOfElements: 30,
    },
    orders: {
      truncate: true,
      numberOfElements: 100,
    },
    products: {
      truncate: true,
      numberOfElements: 200,
    },
  },
};