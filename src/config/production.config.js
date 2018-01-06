module.exports = {
  env: 'production',
  db: {
    options: {
      host: 'localhost',
      dialect: 'sqlite',
      storage: '/data/donna_prod.db',
      logging: console.log,
    }
  },
};