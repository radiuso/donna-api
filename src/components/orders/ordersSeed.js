const faker = require('faker');
const format = require('date-fns/format');
const logger = require ('../../helpers/logger');
const { Order } = require('../../database');
const OrderDAL = require('./ordersDAL');

const createElements = async (numberOfElements, numberOfCustomers) => {
  const elements = [];

  for(let i = 0; i < numberOfElements; ++i) {
    const date = faker.date.recent()
    elements.push({
      id: i + 1,
      concernDate: format(date, 'YYYY-MM-DD'),
      targetDate: date,
      status: faker.random.number({ min: 1, max: 3 }),
      customerId: faker.random.number({ min: 1, max: numberOfCustomers }),
    });
  }

  await Order.bulkCreate(elements)
  logger.info(`${numberOfElements} Orders inserted`);

  return elements;
};

const ordersSeed = async ({ truncate, numberOfElements }, customersConfig) => {
  if (truncate) {
    await OrderDAL.truncate();
  }

  return createElements(numberOfElements, customersConfig.numberOfElements);
};

module.exports = ordersSeed;
