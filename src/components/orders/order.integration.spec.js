const integrationServer = require("../../tests/integrationServer");
const { expect } = require('chai');

describe('Order integration', () => {
  let app;

  beforeEach((done) => {
    app = integrationServer.start(done);
  });

  afterEach((done) => {
    integrationServer.stop(app, done);
  });

  it('Should resolve the first order', () => {
    const query = `{
      order(id: 1) { id }
    }`;
    const expected = {
      "order": {
        "id": 1,
      },
    };

    return integrationServer
      .graphqlQuery(app, query)
      .then((response) => {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.deep.equals(expected);
      });
  });

  it('Should return null as order', () => {
    const query = `{
      order(id: 0) { id }
    }`;
    const expected = {
      "order": null,
    };

    return integrationServer
      .graphqlQuery(app, query)
      .then((response) => {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.deep.equals(expected);
      });
  });

  it('Should create an Order for the first customer', () => {
    const date = new Date();
    const isoDate = date.toISOString();
    const query = `mutation {
      createOrder(order: {
        targetDate: "${isoDate}"
        customerId: 1
      }) {
        order { targetDate, customer { id } }
      }
    }`;

    const expected = {
      createOrder: {
        order: {
          targetDate: isoDate,
          customer: {
            id: 1
          },
        },
      },
    };

    return integrationServer
      .graphqlQuery(app, query)
      .then((response) => {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.deep.equals(expected);
      });
  });
});
