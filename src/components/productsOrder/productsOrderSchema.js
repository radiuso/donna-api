const BaseSchema = require('../base_component/BaseSchema');

class ProductsOrderSchema extends BaseSchema {
  get definition() {
    return `
      type ProductsOrder {
        orderId: Int!
        productId: Int!
        quantity: Int!
        unitPrice: Float!
      }

      input ProductsOrderInput {
        productId: Int!
        quantity: Int!
      }
    `;
  }

  get resolvers() {
    return {};
  }
}

module.exports = new ProductsOrderSchema();
