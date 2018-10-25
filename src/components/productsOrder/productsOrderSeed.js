const faker = require('faker');
const logger = require ('../../helpers/logger');
const { ProductsOrder } = require('../../database');
const ProductsOrderDAL = require('./productsOrderDAL');

const createElements = (numberOfElements, numberOfOrders, numberOfProducts) => {
  const elements = [];
  const assoc = [];

  for(let i = 0; i < numberOfElements; ++i) {
    const orderId = faker.random.number({ min: 1, max: numberOfOrders - 1 });
    const productId = faker.random.number({ min: 1, max: numberOfProducts - 1 });
    const key = `${orderId}_${productId}`;

    if (assoc[key] === undefined) {
      assoc[key] = true;

      elements.push({
        quantity: faker.random.number({ min: 1, max: 20 }),
        orderId: orderId,
        productId: productId,
        price: faker.commerce.price(),
      });
    }
  }

  return ProductsOrder.bulkCreate(elements)
  .then(() => {
    logger.info(`${numberOfElements} Products order inserted`);
  });
};

const productsOrderSeed = async ({ truncate, numberOfElements }, ordersConfig, productsConfig) => {
  if (truncate) {
    await ProductsOrderDAL.truncate();
  }

  return createElements(numberOfElements, ordersConfig.numberOfElements, productsConfig.numberOfElements);
};

module.exports = productsOrderSeed;
