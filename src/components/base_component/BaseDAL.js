const { Op } = require('sequelize');

class BaseDAL {
  constructor(Entity) {
    this.Entity = Entity;
  }

  findAll() {
    return this.Entity.findAll();
  }

  findById(id) {
    return this.Entity.findById(id);
  }

  findAllByIds(ids) {
    return this.Entity.findAll({
      where: {
        id: ids,
      },
    });
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

  async truncate() {
    return this.Entity.destroy({
      where: {
        id: { [Op.gt]: 0 },
      },
    })
  }
}

module.exports = BaseDAL;
