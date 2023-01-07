const db = require('../models/index');

const User = db.users;
const Article = db.articles;
const Category = db.categories;
const ArticleCategory = db.categories_articles;

const create = async (articleInfo) => {
  const { categoryIds, userId } = articleInfo;

  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const promises = categoryIds.map(async (id) => Category.findByPk(id));
  const foundCategories = await Promise.all(promises);

  const allCategoriesValid = foundCategories.every((found) => found !== null);
  if (!allCategoriesValid) throw new Error('"categoryIds" not found');

  const createdArticle = await Article.create({ ...articleInfo, userId, status: 'created' });
  const articleId = createdArticle.dataValues.id;

  const articleCategoriesValues = categoryIds.map((categoryId) => ({ articleId, categoryId }));
  ArticleCategory.bulkCreate(articleCategoriesValues);

  return createdArticle.dataValues;
};

const getAll = async () => {
  const blogPosts = await Article.findAll();
  const promisesArray = blogPosts.map(async (Post) => {
    const { dataValues: user } = await Post.getUser();

    const Categories = await Post.getCategories();
    const categoriesValues = Categories.map(({ dataValues: { id, name } }) => ({ id, name }));

    return {
      ...Post.dataValues,
      user,
      categories: categoriesValues,
    };
  });

  const articles = await Promise.all(promisesArray);
  return articles;
};

const deleteById = async (id, userId) => {
  const row = await Article.findOne({
    where: { id, userId },
  });

  if (!row) throw new Error('Article with this id was not found');

  await row.destroy();
};

module.exports = {
  create,
  getAll,
  deleteById,
};
