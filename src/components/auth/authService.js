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
  login(username, password, context) {
    if (context) {
      context.inProgress = true;
    }

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
      if (context) {
        context.token = token;
      }

      return {
        token,
      };
    });
  }

  authenticate(token) {
    if (token === undefined) {
      throw new Error('not authenticated');
    }

    return {
      token,
    };
  }

  checkAuthentication(context) {
    return new Promise((resolve, reject) => {

      const validateToken = (token) => {
        if (token === undefined) {
          return reject('not authenticated');
        }

        // TODO validation
        return resolve();
      };

      if (context) {
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
      } else {
        return reject('no context');
      }
    });
  }
}

module.exports = new AuthService();
