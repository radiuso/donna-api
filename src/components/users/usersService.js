const BaseService = require('../base_component/BaseService');
const usersDAL = require('./usersDAL');

class UsersService extends BaseService {
  constructor() {
    super('user', usersDAL);
  }
}

module.exports = new UsersService();
