const integrationServer = require("../../tests/integrationServer");
const { expect } = require('chai');

describe('User integration', () => {
  let app;

  beforeEach((done) => {
    app = integrationServer.start(done);
  });

  afterEach((done) => {
    integrationServer.stop(app, done);
  });

  it('Should resolve admin', () => {
    const query = `{
      user(id:1) { id lastName }
    }`;
    const expected = {
      "user": {
        "id": 1,
        "lastName": "admin",
      },
    };

    return integrationServer
      .graphqlQuery(app, query)
      .then((response) => {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.deep.equals(expected);
      });
  });

  it('Should return null as user', () => {
    const query = `{
      user(id: 0) { id lastName }
    }`;
    const expected = {
      "user": null,
    };

    return integrationServer
      .graphqlQuery(app, query)
      .then((response) => {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.deep.equals(expected);
      });
  });

  it('Should create Han Solo user', () => {
    const query = `mutation {
      createUser(user: {
        firstName: "Han",
        lastName: "Solo",
        email: "han.solo@starwars.com"
      }) {
        user { firstName, lastName, email }
      }
    }`;
    const expected = {
      "createUser": {
        "user": {
          firstName: "Han",
          lastName: "Solo",
          email: "han.solo@starwars.com",
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
