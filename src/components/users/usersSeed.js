const faker = require('faker');
const logger = require ('../../helpers/logger');
const { User } = require('../../database');

const createElements = (numberOfElements) => {
  // always create admin user
  const elements = [{
    id: 1,
    firstName: 'admin',
    lastName: 'admin',
  }];

  for(let i = 1; i < numberOfElements; ++i) {
    elements.push({
      id: i + 1,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    });
  }

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
