const faker = require('faker');
const logger = require ('../../helpers/logger');
const { Product } = require('../../database');

const createElements = (numberOfElements) => {
  const elements = [];

  for(let i = 0; i < numberOfElements; ++i) {
    elements.push({
      id: i + 1,
      label: faker.commerce.productName(),
      description: faker.commerce.productAdjective(),
      category: faker.random.number({ min: 1, max: 4 }),
      price: faker.commerce.price(),
    });
  }

  return Product.bulkCreate(elements)
  .then(() => {
    logger.info(`${numberOfElements} Products inserted`);
  });
};

const productsSeed = ({ truncate, numberOfElements }) => {
  if (truncate) {
    return Product.truncate().then(
      () => createElements(numberOfElements)
    );
  }

  return createElements(numberOfElements);
};

module.exports = productsSeed;
