const BaseService = require('../base_component/BaseService');
const customersDAL = require('./customersDAL');

class CustomersService extends BaseService {
  constructor() {
    super('customer', customersDAL);
  }
}

module.exports = new CustomersService();
