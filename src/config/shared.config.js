module.exports = {
  env: 'production',
  server: {
    port: 3000,
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
  seed: {}
};
