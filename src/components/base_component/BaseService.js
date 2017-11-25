const DataLoader = require('dataloader');
const validationErrorHandler = require('../../helpers/validationErrorHandler');

class BaseService {
  constructor(entityName, entityDAL) {
    this.entityDAL = entityDAL;
    this.entityName = entityName;

    this.findByIdLoader = new DataLoader(
      (ids) => entityDAL.findAllByIds(ids)
    );
  }

  findAll() {
    return this.entityDAL.findAll();
  }

  // create an entity and return the entity payload
  create(entity) {
    return this.entityDAL.create(entity)
      .then((entity) => { return { [this.entityName]: entity } })
      .catch(validationErrorHandler);
  }

  // update the entity and return all the object from the db
  update(id, entity) {
    return this.entityDAL
      .update(id, entity)
      .then(() => this.entityDAL.findById(id))
      .then((entity) => { return { [this.entityName]: entity } })
      .catch(validationErrorHandler);
  }
}

module.exports = BaseService;
