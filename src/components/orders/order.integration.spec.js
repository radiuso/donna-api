const integrationServer = require("../../tests/integrationServer");
const { expect, assert } = require('chai');

describe('Order integration', () => {
  before(async () => await integrationServer.start());
  after(async () => await integrationServer.stop());

  it('Should resolve the first order', async () => {
    const response = await integrationServer.graphqlQuery(`{
      order(id: 1) { id }
    }`);

    expect(response.statusCode).to.equal(200);
    expect(response.body.data.order).to.have.deep.equals({
      id: 1,
    });
  });

  it('Should return null as order', async () => {
    try {
      const response = await integrationServer.graphqlQuery(`{
        order(id: 0) { id }
      }`);

      expect(response.statusCode).to.equal(200);
      expect(response.body.data.order).to.equal(null);
    } catch (ex) {
      assert.fail(ex);
    }
  });

  it('Should create an Order for the first customer', async () => {
    const date = new Date();
    const isoDate = date.toISOString();

    try {
      const response = await integrationServer.graphqlMutation(`
      mutation CreateOrder($order: OrderInput!) {
        createOrder(order: $order) {
          order {
            targetDate
            customer {
              id
            }
            productsOrder {
              productId
              quantity
              unitPrice
              unit
            }
          }
        }
      }`, {
        order: {
          targetDate: isoDate,
          customerId: 1,
          productsOrder: [{
            productId: 1,
            quantity: 2,
            unitPrice: 12.3,
            unit: 'Unité',
          }],
        },
      });

      expect(response.statusCode).to.equal(200);

      const order = response.body.data.createOrder.order;
      expect(order.targetDate).to.be.equals(isoDate, 'Target Date');
      expect(order.customer.id).to.be.equals(1, 'Customer Id');
      expect(order.productsOrder).to.have.deep.equals([{
        productId: 1,
        quantity: 2,
        unitPrice: 12.3,
        unit: 'Unité',
      }]);
    } catch (ex) {
      assert.fail(ex);
    }
  });
});
