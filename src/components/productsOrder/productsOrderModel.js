/**
 * Products order model
 * @param {*} sequelize
 * @param {*} DataTypes
 */
module.exports = function(sequelize, DataTypes) {
  const ProductsOrderModel = sequelize.define('products_order', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return ProductsOrderModel;
}
