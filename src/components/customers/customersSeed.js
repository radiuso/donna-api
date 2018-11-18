const faker = require('faker');
const logger = require ('../../helpers/logger');
const { Customer } = require('../../database');
const CustomerDAL = require('./customersDAL');

const createElements = async (numberOfElements) => {
  const elements = [];

  for(let i = 0; i < numberOfElements; ++i) {
    elements.push({
      id: i + 1,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      phone: faker.phone.phoneNumber(),
      city: faker.address.city(),
      street: faker.address.streetAddress(),
      zipCode: faker.address.zipCode(),
    });
  }

  await Customer.bulkCreate(elements);
  logger.info(`${numberOfElements} Customers inserted`);

  return elements;
};

const ordersSeed = async ({ truncate, numberOfElements }) => {
  if (truncate) {
    await CustomerDAL.truncate();
  }

  return createElements(numberOfElements);
};

module.exports = ordersSeed;
