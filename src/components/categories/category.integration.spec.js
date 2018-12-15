const integrationServer = require("../../tests/integrationServer");
const { expect, assert } = require('chai');

describe('Category integration', () => {
  before(async () => await integrationServer.start());
  after(async () => await integrationServer.stop());

  it('Should return all categories', async () => {
    try {
      const response = await integrationServer.graphqlQuery(`{
        categories { id }
      }`);

      expect(response.statusCode).to.equal(200);
      expect(response.body.data.categories).not.to.equal(null);
    } catch (ex) {
      assert.fail(ex);
    }
  });

  it('Should create a category', async () => {
    const label = 'mycattest';

    try {
      const response = await integrationServer.graphqlMutation(`
      mutation CreateCategory($category: CategoryInput!) {
        createCategory(category: $category) {
          category {
            id
            label
          }
        }
      }`, {
        category: {
          label,
        },
      });

      expect(response.statusCode).to.equal(200);

      const category = response.body.data.createCategory.category;
      expect(category.id).not.to.equal('Id is not null');
      expect(category.label).to.be.equals(label, 'Label');
    } catch (ex) {
      assert.fail(ex);
    }
  });
});
