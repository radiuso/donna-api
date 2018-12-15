const BaseDAL = require('../base_component/BaseDAL');
const { Category } = require('../../database');

class CategoryDAL extends BaseDAL {
  constructor() {
    super(Category);
  }
}

module.exports = new CategoryDAL();
