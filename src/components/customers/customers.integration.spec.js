const integrationServer = require("../../tests/integrationServer");
const { expect } = require('chai');

describe('Customer integration', () => {
  let app;

  beforeEach((done) => {
    app = integrationServer.start(done);
  });

  afterEach((done) => {
    integrationServer.stop(app, done);
  });

  it('Should resolve the first customer', () => {
    const query = `{
      customer(id: 1) { id }
    }`;
    const expected = {
      "customer": {
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

  it('Should return null as customer', () => {
    const query = `{
      customer(id: 0) { id }
    }`;
    const expected = {
      "customer": null,
    };

    return integrationServer
      .graphqlQuery(app, query)
      .then((response) => {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.deep.equals(expected);
      });
  });

  it('Should create Anakin Skywalker', () => {
    const query = `mutation {
      createCustomer(customer: {
        firstName: "Anakin",
        lastName: "Skywalker",
        phone: "",
        city: "Tatooine",
        street: "Road street",
        zipCode: ""
      }) {
        customer { firstName, lastName, phone, city, street, zipCode }
      }
    }`;

    const expected = {
      createCustomer: {
        customer: {
          firstName: "Anakin",
          lastName: "Skywalker",
          phone: "",
          city: "Tatooine",
          street: "Road street",
          zipCode: ""
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
