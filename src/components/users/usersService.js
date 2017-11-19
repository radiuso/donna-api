const DataLoader = require('dataloader');
const usersDAL = require('./usersDAL');
const validationErrorHandler = require('../../helpers/validationErrorHandler');

class UsersService {
  findAll() {
    return usersDAL.findAll();
  }

  findByIdLoader() {
    return new DataLoader(
      (ids) => usersDAL.findAllByIds(ids)
    );
  }

  create(user) {
    return usersDAL.create(user)
      .catch(validationErrorHandler);
  }

  // update the user and return all the object from the db
  update(id, user) {
    return usersDAL
      .update(id, user)
      .then(() => usersDAL.findById(id))
      .catch(validationErrorHandler);
  }
}

module.exports = new UsersService();
