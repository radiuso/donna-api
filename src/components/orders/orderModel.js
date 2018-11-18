const format = require('date-fns/format');

/**
 * Order model
 * @param {*} sequelize
 * @param {*} DataTypes
 */
module.exports = function(sequelize, DataTypes) {
  const Order = sequelize.define('order', {
    // date of the concerned day ex: 2018-11-16T00:00:00.000Z
    concernDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    targetDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
  }, {
    hooks: {
      beforeValidate: (order) => {
        // set the concernDate
        if (order.targetDate) {
          order.concernDate = format(order.targetDate, 'YYYY-MM-DD')
        }
      },
    }
  });

  Order.associate = (models) => {
    Order.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: false,
      }
    });

    Order.belongsToMany(models.Product, { through: models.ProductsOrder });
  };

  return Order;
}