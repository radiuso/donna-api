const sharedConfig = require('./shared.config');
const envConfig = require(`./${process.env.NODE_ENV}.config`);

module.exports = Object.assign({}, sharedConfig, envConfig);
