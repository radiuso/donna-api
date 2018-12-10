module.exports = {
  env: 'production',
  server: {
    port: 8080,
  },
  secrets: {
    token: process.env.APP_TOKEN,
  },
  db: {
    options: {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      storage: process.env.DB_STORAGE,
      logging: false,
      freezeTableName: true,
      operatorsAliases: false,
    }
  },
  seed: {
    users: {
      truncate: false,
      numberOfElements: 10,
    },
    customers: {
      truncate: false,
      numberOfElements: 30,
    },
    orders: {
      truncate: false,
      numberOfElements: 100,
    },
    products: {
      truncate: false,
      numberOfElements: 200,
    },
    productsOrder: {
      truncate: false,
      numberOfElements: 250,
    },
  },
};
