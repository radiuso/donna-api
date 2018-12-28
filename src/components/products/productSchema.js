const BaseSchema = require('../base_component/BaseSchema');
const productsService = require('./productsService');
const categoryService = require('../categories/categoryService');

class ProductSchema extends BaseSchema {
  get definition() {
    return `
      type Product {
        id: Int!
        label: String!
        description: String
        unitPrice: Float!
        unit: String!
        categoryId: Int
        category: Category
      }

      type ProductPayload {
        product: Product
      }

      input ProductInput {
        label: String!
        description: String
        categoryId: Int!
        price: String
        unitPrice: Float
        unit: String
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
      Product: {
        category: (obj) => categoryService.findByIdLoader.load(obj.categoryId),
      },
      Query: {
        products: () => productsService.findAll(),
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
