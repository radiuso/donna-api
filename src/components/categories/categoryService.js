const BaseService = require('../base_component/BaseService');
const categoryDAL = require('./categoryDAL');

class CategoryService extends BaseService {
  constructor() {
    super('category', categoryDAL);
  }
}

module.exports = new CategoryService();
