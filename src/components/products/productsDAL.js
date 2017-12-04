const BaseDAL = require('../base_component/BaseDAL');
const { Product } = require('../../database');

class ProductsDAL extends BaseDAL {
  constructor() {
    super(Product);
  }
}

module.exports = new ProductsDAL();
