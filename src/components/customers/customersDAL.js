const BaseDAL = require('../base_component/BaseDAL');
const { Customer } = require('../../database');

class CustomersDAL extends BaseDAL {
  constructor() {
    super(Customer);
  }
}

module.exports = new CustomersDAL();
