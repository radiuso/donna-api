const BaseSchema = require('../base_component/BaseSchema');
const categoryService = require('./categoryService');

class CategorySchema extends BaseSchema {
  get definition() {
    return `
      type Category {
        id: Int!
        label: String!
      }

      type CategoryPayload {
        category: Category
      }

      input CategoryInput {
        label: String!
      }
    `;
  }

  get query() {
    return `
      categories: [Category]!
    `;
  }

  get mutation() {
    return `
      createCategory(category: CategoryInput!): CategoryPayload
      updateCategory(id: Int!, category: CategoryInput!): CategoryPayload
    `;
  }

  get resolvers() {
    return {
      Query: {
        categories: () => categoryService.findAll(),
      },
      Mutation: {
        createCategory: (obj, { category }) => categoryService.create(category),
        updateCategory: (obj, { id, category }) => categoryService.update(id, category),
      },
    };
  }
}

module.exports = new CategorySchema();
