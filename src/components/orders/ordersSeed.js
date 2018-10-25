const faker = require('faker');
const logger = require ('../../helpers/logger');
const { Order } = require('../../database');
const OrderDAL = require('./ordersDAL');

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

const ordersSeed = async ({ truncate, numberOfElements }, customersConfig) => {
  if (truncate) {
    await OrderDAL.truncate();
  }

  return createElements(numberOfElements, customersConfig.numberOfElements);
};

module.exports = ordersSeed;
