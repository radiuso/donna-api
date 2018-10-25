const { Op } = require('sequelize');

class BaseDAL {
  constructor(Entity) {
    this.Entity = Entity;
  }

  findAll() {
    return this.Entity.findAll();
  }

  findById(id) {
    return this.Entity.findByPk(id);
  }

  findAllByIds(ids) {
    return this.Entity.findAll({
      where: {
        id: ids,
      },
    });
  }

  findOne(where) {
    return this.Entity.findOne(where);
  }

  create(entity) {
    return this.Entity.create(entity);
  }

  update(id, entity) {
    return this.Entity.update(entity, {
      where: {
        id,
      },
    });
  }

  delete(id) {
    return this.Entity.destroy({
      where: {
        id,
      },
    });
  }

  async truncate() {
    return this.Entity.destroy({
      where: {
        id: { [Op.gt]: 0 },
      },
    })
  }
}

module.exports = BaseDAL;
