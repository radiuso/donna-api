const { setTimeout } = require('timers');
const jwt = require('jsonwebtoken');
const { secrets } = require('../../config');
const authDAL = require('./authDAL');
const authEmitter = require('./authEmitter');

const signToken = (id, user) => {
  return jwt.sign({
    id,
    email: user.email,
  }, secrets.token, {
    expiresIn: 60 * 60 * 5
  });
};

const decodeToken = (token) => {
  try {
    return jwt.verify(token, secrets.token);
  } catch (ex) {
    console.error(ex);
  }

  return null;
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

      if (context) {
        context.token = token;
      }

      authEmitter.emit('login_success', user);

      return {
        token,
      };
    });
  }

  authenticate(token, context) {
    if (context) {
      context.inProgress = true;
    }

    return new Promise((resolve, reject) => {
      try {
        const decoded = decodeToken(token);

        if (context) {
          context.token = token;
        }

        setTimeout(() => {
          authEmitter.emit('login_success', decoded);
        }, 50);

        resolve({
          token,
          decoded,
        });
      } catch (err) {
        setTimeout(() => {
          authEmitter.emit('login_error');
        }, 50);

        reject(err.message);
      }
    });
  }

  checkAuthentication(context) {
    return new Promise((resolve, reject) => {
      if (!context) {
        return reject('no context');
      }
      if (!context.inProgress && context.token) {
        return resolve(decodeToken(context.token));
      }

      authEmitter.on('login_success', (user) => {
        return resolve(user);
      });

      authEmitter.on('login_error', () => {
        return reject('no rights');
      });
    });
  }
}

module.exports = new AuthService();
