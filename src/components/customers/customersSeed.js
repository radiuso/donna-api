const faker = require('faker');
const logger = require ('../../helpers/logger');
const { Customer } = require('../../database');

const createElements = (numberOfElements) => {
  const elements = [];

  for(let i = 1; i < numberOfElements; ++i) {
    elements.push({
      id: i + 1,
      firstName: faker.name.firstName,
      lastName: faker.name.lastName,
      phone: faker.phone.phoneNumber,
      city: faker.address.city,
      street: faker.address.streetAddress,
      zipCode: faker.address.zipCode,
    });
  }

  return Customer.bulkCreate(elements)
  .then(() => {
    logger.info(`${numberOfElements} Customers inserted`);
  });
};

const ordersSeed = ({ truncate, numberOfElements }) => {
  if (truncate) {
    return Customer.truncate().then(() => createElements(numberOfElements));
  }

  return createElements(numberOfElements);
};

module.exports = ordersSeed;
