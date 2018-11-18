const faker = require('faker');
const logger = require ('../../helpers/logger');
const { Product } = require('../../database');
const ProductsDAL = require('./productsDAL');

const units = ['Unité', 'KG', '3'];

const createElements = async (numberOfElements) => {
  const elements = [];

  for(let i = 0; i < numberOfElements; ++i) {
    elements.push({
      id: i + 1,
      label: faker.commerce.productName(),
      description: faker.commerce.productAdjective(),
      category: faker.random.number({ min: 1, max: 4 }),
      unitPrice: faker.commerce.price(1, 30, 1),
      unit: faker.random.arrayElement(units),
    });
  }

  await Product.bulkCreate(elements)
  logger.info(`${numberOfElements} Products inserted`);

  return elements;
};

const productsSeed = async ({ truncate, numberOfElements }) => {
  if (truncate) {
    await ProductsDAL.truncate();
  }

  return createElements(numberOfElements);
};

module.exports = productsSeed;
