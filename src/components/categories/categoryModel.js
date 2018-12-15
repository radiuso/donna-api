/**
 * Category model
 * @param {*} sequelize
 * @param {*} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Category.associate = (models) => {
    Category.hasMany(models.Product, { as: 'Products' });
  };

  return Category;
}
