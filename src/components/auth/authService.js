const jwt = require('jsonwebtoken');
const authDAL = require('./authDAL');
const { secrets } = require('../../config');
const authEmitter = require('./authEmitter');

const signToken = (id, user) => {
  return jwt.sign({
    id,
    email: user.email,
  }, secrets.token, {
    expiresIn: 60 * 60 * 5
  });
};

class AuthService {
  authenticate(username, password, context) {
    context.inProgress = true;

    return authDAL.findByUsername(username)
    .then((user) => {
      if (!user || !user.verifyPassword(password)) {
        authEmitter.emit('login_error');
        throw new Error('Mismatch');
      }

      return user;
    })
    .then((user) => {
      const token = signToken(user.id, user);

      authEmitter.emit('login_success', token);
      context.token = token;

      return {
        token,
      };
    });
  }

  checkAuthentication(context) {
    return new Promise((resolve, reject) => {

      const validateToken = (token) => {
        if (token === undefined) {
          return reject('not authenticated');
        }

        return resolve();
      };

      if (context.inProgress) {
        authEmitter.on('login_success', (token) => {
          validateToken(token);
        });

        authEmitter.on('login_error', () => {
          return reject('not rights');
        });
      } else {
        validateToken(context.token);
      }
    });
  }
}

module.exports = new AuthService();
