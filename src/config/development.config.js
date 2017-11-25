module.exports = {
  env: 'development',
  db: {
    options: {
      host: 'localhost',
      dialect: 'sqlite',
      storage: '/data/donna.db',
      logging: console.log,
    }
  }
};