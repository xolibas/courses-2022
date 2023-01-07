const CategoryArticle = (sequelize, DataTypes) => {
  const CategoryArticleModel = sequelize.define(
    'categories_articles',
    {
      articleId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    { timestamps: false, tableName: 'categories_articles' }
  );

  CategoryArticleModel.associate = (models) => {
    models.articles.belongsToMany(models.categories, {
      as: 'categories',
      through: CategoryArticleModel,
      foreignKey: 'articleId',
      otherKey: 'categoryId',
    });

    models.categories.belongsToMany(models.articles, {
      as: 'articles',
      through: CategoryArticleModel,
      foreignKey: 'categoryId',
      otherKey: 'articleId',
    });
  };
  return CategoryArticleModel;
};

module.exports = CategoryArticle;
