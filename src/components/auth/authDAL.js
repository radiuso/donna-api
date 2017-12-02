const { User } = require('../../database');

class AuthDAL {
  findByUsername(username) {
    return User.findOne({
      where: {
        email: username
      },
    });
  }
}

module.exports = new AuthDAL();
