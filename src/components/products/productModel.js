/**
 * Product model
 * @param {*} sequelize
 * @param {*} DataTypes
 */
module.exports = function(sequelize, DataTypes) {
  const Product = sequelize.define('product', {
    label: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    category: {
      type: DataTypes.INTEGER,
      allowNull: true
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

  Product.associate = (models) => {
    Product.belongsToMany(models.Order, { through: models.ProductsOrder });
  };

  return Product;
}