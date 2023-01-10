const Category = require('../models/mongo/categories');

// const db = require('../models/postgresql/index');

// const Category = db.categories;

const create = async (name) => {
  const createdCategory = await Category.create({ name });
  // return createdCategory.dataValues;

  return createdCategory;
};

const getAll = async () => {
  // const categories = await Category.findAll();
  const categories = await Category.find();
  return categories;
};

const deleteById = async (id) => {
  // const row = await Category.findOne({
  //   where: { id },
  // });

  const row = await Category.findOneAndDelete({
    _id: id,
  });

  if (!row) throw new Error('Category with this id was not found');

  // await row.destroy();
};

module.exports = {
  create,
  getAll,
  deleteById,
};
