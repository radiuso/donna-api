const BaseService = require('../base_component/BaseService');
const productsDAL = require('./productsDAL');

class ProductsService extends BaseService {
  constructor() {
    super('product', productsDAL);
  }
}

module.exports = new ProductsService();
