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
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 1,
    },
  });

  Product.associate = (models) => {
    Product.belongsToMany(models.Order, { through: models.ProductsOrder });
  };

  return Product;
}