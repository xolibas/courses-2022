const db = require('../models/index');

const Category = db.categories;

const create = async (name) => {
  const createdCategory = await Category.create({ name });
  return createdCategory.dataValues;
};

const getAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

const deleteById = async (id) => {
  const row = await Category.findOne({
    where: { id },
  });

  if (!row) throw new Error('Category with this id was not found');

  await row.destroy();
};

module.exports = {
  create,
  getAll,
  deleteById,
};
