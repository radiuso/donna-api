const BaseSchema = require('../base_component/BaseSchema');
const productsService = require('./productsService');
const authService = require('../auth/authService');

class ProductSchema extends BaseSchema {
  get definition() {
    return `
      type Product {
        id: Int!
        label: String!
        description: String
        category: Int!
        price: Float
      }

      type ProductPayload {
        product: Product
      }

      input ProductInput {
        label: String
        description: String
        category: String
        price: String
      }
    `;
  }

  get query() {
    return `
      products: [Product]!
      product(id: Int!): Product
    `;
  }

  get mutation() {
    return `
      createProduct(product: ProductInput!): ProductPayload
      updateProduct(id: Int!, product: ProductInput!): ProductPayload
    `;
  }

  get resolvers() {
    return {
      Query: {
        products: (obj, args, context) => authService.checkAuthentication(context)
          .then(() => productsService.findAll()),
        product: (obj, { id }) => productsService.findByIdLoader.load(id),
      },
      Mutation: {
        createProduct: (obj, { order }) => productsService.create(order),
        updateProduct: (obj, { id, order }) => productsService.update(id, order),
      },
    };
  }
}

module.exports = new ProductSchema();
