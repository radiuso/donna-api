const objectAssignDeep = require('object-assign-deep');
const sharedConfig = require('./shared.config');
const envConfig = require(`./${process.env.NODE_ENV}.config`);

module.exports = objectAssignDeep({}, sharedConfig, envConfig);
