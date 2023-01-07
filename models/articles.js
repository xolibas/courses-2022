const Article = (sequelize, DataTypes) => {
  const ArticleModel = sequelize.define('articles', {
    title: DataTypes.STRING,
    userId: DataTypes.STRING,
    content: DataTypes.STRING,
    status: DataTypes.STRING,
  });

  ArticleModel.associate = (models) => {
    models.articles.belongsTo(models.users, {
      foreignKey: 'userId',
    });
  };
  return ArticleModel;
};

module.exports = Article;
