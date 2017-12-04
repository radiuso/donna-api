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
    productsOrder: {
      truncate: true,
      numberOfElements: 250,
    },
  },
};