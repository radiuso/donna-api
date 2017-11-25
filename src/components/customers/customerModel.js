/**
 * Customer model
 * @param {*} sequelize
 * @param {*} DataTypes
 */
module.exports = function(sequelize, DataTypes) {
  const Customer = sequelize.define('customer', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    street: {
      type: DataTypes.STRING,
    },
    zipCode: {
      type: DataTypes.STRING,
    }
  });

  return Customer;
}
