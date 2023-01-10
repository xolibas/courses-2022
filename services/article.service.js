const User = require('../models/mongo/users');
const Article = require('../models/mongo/articles');
const Category = require('../models/mongo/categories');
const ArticleCategory = require('../models/mongo/categories_articles');
// const db = require('../models/postgresql/index');

// const User = db.users;
// const Article = db.articles;
// const Category = db.categories;
// const ArticleCategory = db.categories_articles;

const create = async (articleInfo) => {
  const { categoryIds, userId } = articleInfo;

  // const user = await User.findByPk(userId);
  const user = await User.findOne({
    _id: userId,
  });

  if (!user) {
    throw new Error('User not found');
  }

  // const promises = categoryIds.map(async (id) => Category.findByPk(id));
  const promises = categoryIds.map(async (id) =>
    Category.findOne({
      _id: id,
    })
  );

  const foundCategories = await Promise.all(promises);

  const allCategoriesValid = foundCategories.every((found) => found !== null);
  if (!allCategoriesValid) throw new Error('"categoryIds" not found');

  // const createdArticle = await Article.create({ ...articleInfo, userId, status: 'created' });
  const createdArticle = await Article.create({
    ...articleInfo,
    author: userId,
    status: 'created',
  });
  const articleId = createdArticle.id;

  // const articleCategoriesValues = categoryIds.map((categoryId) => ({ articleId, categoryId }));
  const articleCategoriesValues = categoryIds.map((categoryId) => ({
    article: articleId,
    category: categoryId,
  }));
  // ArticleCategory.bulkCreate(articleCategoriesValues);
  ArticleCategory.create(articleCategoriesValues);

  // return createdArticle.dataValues;
  return createdArticle;
};

const update = async (id, articleInfo) => {
  const { categoryIds, userId } = articleInfo;

  // const user = await User.findByPk(userId);
  const user = await User.findOne({
    _id: userId,
  });

  if (!user) {
    throw new Error('User not found');
  }

  // const promises = categoryIds.map(async (categoryId) => Category.findByPk(categoryId));
  const promises = categoryIds.map(async (categoryId) =>
    Category.findOne({
      _id: categoryId,
    })
  );
  const foundCategories = await Promise.all(promises);

  const allCategoriesValid = foundCategories.every((found) => found !== null);
  if (!allCategoriesValid) throw new Error('"categoryIds" not found');

  // const article = await Article.findOne({
  //   where: { id, userId },
  // });
  const article = await Article.findOne({
    _id: id,
    author: userId,
  });

  if (!article) throw new Error('Article with this id was not found');

  // await article.update({ ...articleInfo, userId, status: 'updated' });
  await article.update({ ...articleInfo, author: userId, status: 'updated' });

  // const articleCategoriesValues = categoryIds.map((categoryId) => ({ articleId: id, categoryId }));
  const articleCategoriesValues = categoryIds.map((categoryId) => ({
    article: id,
    category: categoryId,
  }));

  articleCategoriesValues.forEach(async (item) => {
    // const articleCategory = await ArticleCategory.findOne({ where: item });
    const articleCategory = await ArticleCategory.findOne(item);

    if (!articleCategory) {
      ArticleCategory.create(item);
    }
  });

  // return article.dataValues;
  return article;
};

const getAll = async () => {
  // const blogPosts = await Article.findAll();
  const blogPosts = await Article.find();
  const promisesArray = blogPosts.map(async (article) => {
    const returnValue = JSON.parse(JSON.stringify(article));
    // const { dataValues: user } = await Post.getUser();
    returnValue.user = await User.findOne({ _id: article.author });

    // const Categories = await article.getCategories();
    // const categoriesValues = categories.map(({ dataValues: { id, name } }) => ({ id, name }));
    const articleCategories = await ArticleCategory.find({ article: article.id });

    const categoriesPromises = articleCategories.map(async (articleCategory) => {
      const category = await Category.findOne({ _id: articleCategory.category });

      return category;
    });

    returnValue.categories = await Promise.all(categoriesPromises);

    // return {
    //   ...article.dataValues,
    //   user,
    //   categories: categoriesValues,
    // };

    return returnValue;
  });

  const articles = await Promise.all(promisesArray);
  return articles;
};

const deleteById = async (id, userId) => {
  // const row = await Article.findOne({
  //   where: { id, userId },
  // });
  const row = await Article.findOneAndDelete({
    _id: id,
    author: userId,
  });

  if (!row) throw new Error('Article with this id was not found');

  await ArticleCategory.find({ article: id }).deleteMany();

  // await row.destroy();
};

module.exports = {
  create,
  getAll,
  deleteById,
  update,
};
