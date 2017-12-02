module.exports = {
  env: 'production',
  server: {
    port: 3000,
  },
  secrets: {
    token: 'donna-api-secret',
  },
  db: {
    options: {
      host: '',
      dialect: '',
      storage: '',
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
  },
};
