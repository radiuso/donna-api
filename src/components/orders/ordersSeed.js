const faker = require('faker');
const logger = require ('../../helpers/logger');
const { Order } = require('../../database');

const createElements = (numberOfElements, numberOfCustomers) => {
  const elements = [];

  for(let i = 0; i < numberOfElements; ++i) {
    elements.push({
      id: i + 1,
      targetDate: faker.date.recent(),
      status: faker.random.number({ min: 1, max: 3 }),
      customerId: faker.random.number({ min: 1, max: numberOfCustomers }),
    });
  }

  return Order.bulkCreate(elements)
  .then(() => {
    logger.info(`${numberOfElements} Orders inserted`);
  });
};

const ordersSeed = ({ truncate, numberOfElements }, customersConfig) => {
  if (truncate) {
    return Order.truncate().then(
      () => createElements(numberOfElements, customersConfig.numberOfElements)
    );
  }

  return createElements(numberOfElements, customersConfig.numberOfElements);
};

module.exports = ordersSeed;
