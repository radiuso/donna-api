const faker = require('faker');
const logger = require ('../../helpers/logger');
const { Category } = require('../../database');
const DAL = require('./categoryDAL');

const createElements = async (numberOfElements) => {
  const elements = [];

  for(let i = 0; i < numberOfElements; ++i) {
    elements.push({
      id: i + 1,
      label: faker.commerce.product,
    });
  }

  await Category.bulkCreate(elements);
  logger.info(`${numberOfElements} Categories inserted`);

  return elements;
};

const seed = async ({ truncate, numberOfElements }) => {
  if (truncate) {
    await DAL.truncate();
  }

  return createElements(numberOfElements);
};

module.exports = seed;
