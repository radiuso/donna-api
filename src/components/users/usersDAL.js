const BaseDAL = require('../base_component/BaseDAL');
const { User } = require('../../database');

class UsersDAL extends BaseDAL {
  constructor() {
    super(User);
  }
}

module.exports = new UsersDAL();
