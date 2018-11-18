const faker = require('faker');
const logger = require ('../../helpers/logger');
const { User } = require('../../database');
const UsersDAL = require('./usersDAL');

const createElements = async (numberOfElements) => {
  // always create admin user
  const elements = [{
    id: 1,
    email: 'admin@donna.com',
    passwd: 'securepwd',
    firstName: 'admin',
    lastName: 'admin',
  }];

  for(let i = 1; i < numberOfElements; ++i) {
    elements.push({
      id: i + 1,
      email: faker.internet.email(),
      passwd: 'securepwd',
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    });
  }

  await User.bulkCreate(elements)
  logger.info(`${numberOfElements} Users inserted`);

  return elements;
};

const usersSeed = async ({ truncate, numberOfElements }) => {
  if (truncate) {
    await UsersDAL.truncate();
    return createElements(numberOfElements);
  }

  return createElements(numberOfElements);
};

module.exports = usersSeed;
