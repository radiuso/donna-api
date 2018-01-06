module.exports = {
  env: 'development',
  db: {
    options: {
      host: 'localhost',
      dialect: 'sqlite',
      storage: '/data/donna.db',
      logging: null,
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