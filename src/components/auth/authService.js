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
  return jwt.verify(token, secrets.token);
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
      const decoded = decodeToken(token);

      if (context) {
        context.token = token;
      }

      authEmitter.emit('login_success', decoded);

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
      if (context) {
        if (context.inProgress) {
          authEmitter.on('login_success', (user) => {
            resolve(user);
          });

          authEmitter.on('login_error', () => {
            return reject('no rights');
          });
        } else {
          resolve(decodeToken(context.token));
        }
      } else {
        return reject('no context');
      }
    });
  }
}

module.exports = new AuthService();
