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
    unitPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 1,
    },
    unit: {
      type:DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Unité'
    },
  });

  return ProductsOrderModel;
}
