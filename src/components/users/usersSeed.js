const logger = require ('../../helpers/logger');
const { User } = require('../../database');

const createElements = (numberOfElements) => {
  const elements = [{
    firstName: 'John@doe.com',
    lastName: 'test',
  }, {
    firstName: 'a@a.com',
    lastName: 'test',
  }];

  return User.bulkCreate(elements)
  .then(() => {
    logger.info(`${numberOfElements} Users inserted`);
  });
};


const usersSeed = ({ truncate, numberOfElements }) => {
  if (truncate) {
    return User.truncate().then(() => createElements(numberOfElements));
  }

  return createElements(numberOfElements);
};

module.exports = usersSeed;
