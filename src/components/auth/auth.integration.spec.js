const integrationServer = require("../../tests/integrationServer");
const { expect } = require('chai');

describe('Auth integration', () => {
  let app;

  beforeEach((done) => {
    app = integrationServer.start(done);
  });

  afterEach((done) => {
    integrationServer.stop(app, done);
  });

  it('Should login with admin user', () => {
    const query = `{
      login(username: "admin@donna.com", password: "securepwd") {
        token
      }
    }`;

    return integrationServer
      .graphqlQuery(app, query)
      .then((response) => {
        const token = response.body.login.token;

        expect(response.statusCode).to.equal(200);
        expect(token)
          .to.be.a('string')
          .that.is.not.empty;

          return token;
      })
      .then((token) => {
        return integrationServer
        .graphqlQuery(app, `{
          authenticate(token: "${token}") {
            token
          }
        }`);
      })
      .then((response) => {
        const token = response.body.authenticate.token;

        expect(response.statusCode).to.equal(200);
        expect(token)
          .to.be.a('string')
          .that.is.not.empty;

          return token;
      });
  });
});
