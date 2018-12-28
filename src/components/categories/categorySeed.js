const logger = require ('../../helpers/logger');
const { Category } = require('../../database');
const DAL = require('./categoryDAL');

const createElements = async (numberOfElements) => {
  const elements = [{
    id: 1,
    label: 'Boulangerie',
  }, {
    id: 2,
    label: 'Patisserie',
  }, {
    id: 3,
    label: 'Restauration',
  }, {
    id: 4,
    label: 'Alcool',
  }];

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
