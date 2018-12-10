const integrationServer = require("../../tests/integrationServer");
const { expect, assert } = require('chai');

describe('Order integration', () => {
  before(async () => await integrationServer.start());
  after(async () => await integrationServer.stop());

  it('Should resolve the first order', async () => {
    const response = await integrationServer.graphqlQuery(`{
      login(username: "admin@donna.com", password: "securepwd") {
        token
      },
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
        login(username: "admin@donna.com", password: "securepwd") {
          token
        },
        order(id: 0) { id }
      }`);

      expect(response.statusCode).to.equal(200);
      expect(response.body.data.order).to.equal(null);
    } catch (ex) {
      console.error(ex);
      assert.fail(ex);
    }
  });

  // it('Should create an Order for the first customer', () => {
  //   const date = new Date();
  //   const isoDate = date.toISOString();
  //   const query = `mutation {
  //     createOrder(order: {
  //       targetDate: "${isoDate}"
  //       customerId: 1
  //     }) {
  //       order { targetDate, customer { id } }
  //     }
  //   }`;

  //   const expected = {
  //     createOrder: {
  //       order: {
  //         targetDate: isoDate,
  //         customer: {
  //           id: 1
  //         },
  //       },
  //     },
  //   };

  //   return integrationServer
  //     .graphqlQuery(app, query)
  //     .then((response) => {
  //       expect(response.statusCode).to.equal(200);
  //       expect(response.body).to.have.deep.equals(expected);
  //     });
  // });
});
