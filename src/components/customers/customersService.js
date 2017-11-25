const DataLoader = require('dataloader');
const customersDAL = require('./customersDAL');
const validationErrorHandler = require('../../helpers/validationErrorHandler');

class CustomersService {
  findAll() {
    return customersDAL.findAll();
  }

  findByIdLoader() {
    return new DataLoader(
      (ids) => customersDAL.findAllByIds(ids)
    );
  }

  // create a customer and return the customer payload
  create(customer) {
    return customersDAL.create(customer)
      .then((customer) => { return { customer } })
      .catch(validationErrorHandler);
  }

  // update the customer and return all the object from the db
  update(id, customer) {
    return customersDAL
      .update(id, customer)
      .then(() => customersDAL.findById(id))
      .catch(validationErrorHandler);
  }
}

module.exports = new CustomersService();
