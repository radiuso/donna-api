const DataLoader = require('dataloader');
const ordersDAL = require('./ordersDAL');
const validationErrorHandler = require('../../helpers/validationErrorHandler');

class OrdersService {
  constructor() {
    this.findByIdLoader = new DataLoader(
      (ids) => ordersDAL.findAllByIds(ids)
    );
  }

  findAll() {
    return ordersDAL.findAll();
  }

  // create a order and return the order payload
  create(order) {
    return ordersDAL.create(order)
      .then((order) => { return { order } })
      .catch(validationErrorHandler);
  }

  // update the order and return all the object from the db
  update(id, order) {
    return ordersDAL
      .update(id, order)
      .then(() => ordersDAL.findById(id))
      .catch(validationErrorHandler);
  }
}

module.exports = new OrdersService();
