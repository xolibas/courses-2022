const Category = (sequelize, DataTypes) => {
  const CategoryModel = sequelize.define('categories', {
    name: DataTypes.STRING,
  });

  return CategoryModel;
};

module.exports = Category;
