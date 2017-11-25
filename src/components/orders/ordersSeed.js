const faker = require('faker');
const logger = require ('../../helpers/logger');
const { Order } = require('../../database');

const createElements = (numberOfElements) => {
  const elements = [];

  for(let i = 1; i < numberOfElements; ++i) {
    elements.push({
      id: i + 1,
      targetDate: faker.date.recent(),
      status: faker.random.number({ min: 1, max: 3 }),
    });
  }

  return Order.bulkCreate(elements)
  .then(() => {
    logger.info(`${numberOfElements} Orders inserted`);
  });
};

const ordersSeed = ({ truncate, numberOfElements }) => {
  if (truncate) {
    return Order.truncate().then(() => createElements(numberOfElements));
  }

  return createElements(numberOfElements);
};

module.exports = ordersSeed;
