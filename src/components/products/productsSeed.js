const faker = require('faker');
const logger = require ('../../helpers/logger');
const { Product } = require('../../database');
const ProductsDAL = require('./productsDAL');

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

const productsSeed = async ({ truncate, numberOfElements }) => {
  if (truncate) {
    await ProductsDAL.truncate();
  }

  return createElements(numberOfElements);
};

module.exports = productsSeed;
