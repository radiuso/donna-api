const BaseSchema = require('../base_component/BaseSchema');

class ProductsOrderSchema extends BaseSchema {
  get definition() {
    return `
      type ProductsOrder {
        orderId: Int!
        productId: Int!
        quantity: Int!
        unitPrice: Float!
        unit: String
      }

      input ProductsOrderInput {
        productId: Int!
        quantity: Int!
        unitPrice: Float!
        unit: String
      }
    `;
  }

  get resolvers() {
    return {};
  }
}

module.exports = new ProductsOrderSchema();
