const faker = require('faker');
const logger = require ('../../helpers/logger');
const { ProductsOrder } = require('../../database');
const ProductsOrderDAL = require('./productsOrderDAL');

const createElements = async (numberOfElements, orders, products) => {
  const elements = [];
  const assoc = [];

  for(let i = 0; i < numberOfElements; ++i) {
    const myOrder = faker.random.arrayElement(orders);
    const myProduct = faker.random.arrayElement(products);

    const key = `${myOrder.id}_${myProduct.id}`;

    if (assoc[key] === undefined) {
      assoc[key] = true;

      elements.push({
        quantity: faker.random.number({ min: 1, max: 20 }),
        orderId: myOrder.id,
        productId: myProduct.id,
        unitPrice: myProduct.unitPrice,
        unit: myProduct.unit,
      });
    }
  }

  await ProductsOrder.bulkCreate(elements);
  logger.info(`${numberOfElements} Products order inserted`);

  return elements;
};

const productsOrderSeed = async ({ truncate, numberOfElements }, orders, products) => {
  if (truncate) {
    await ProductsOrderDAL.truncate();
  }

  return createElements(numberOfElements, orders, products);
};

module.exports = productsOrderSeed;
