const BaseSchema = require('../base_component/BaseSchema');
const productsService = require('../products/productsService');

class ProductsOrderSchema extends BaseSchema {
  get definition() {
    return `
      type ProductsOrder {
        orderId: Int!
        productId: Int!
        quantity: Int!
        unitPrice: Float!
        unit: String!
        product: Product!
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
    return {
      ProductsOrder: {
        product: (obj, ctx) => productsService.findByIdLoader.load(obj.productId),
      },
    };
  }
}

module.exports = new ProductsOrderSchema();
