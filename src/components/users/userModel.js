/**
 * User model
 * @param {*} sequelize
 * @param {*} DataTypes
 */
module.exports = function(sequelize, DataTypes) {
  const UserModel = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
  });

  return UserModel;
}