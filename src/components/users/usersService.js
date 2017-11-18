const DataLoader = require('dataloader');
const usersDAL = require('./usersDAL');

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
    return usersDAL.create(user);
  }

  // update the user and return all the object from the db
  update(id, user) {
    return usersDAL
      .update(id, user)
      .then(() => usersDAL.findById(id));
  }
}

module.exports = new UsersService();
