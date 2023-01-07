const categoryService = require('../services/category.service');

const create = async (req, res) => {
  const { body } = req;
  if (!('name' in body)) {
    return res.status(400).json({ message: '"name" is required' });
  }

  try {
    const createdCategory = await categoryService.create(body.name);
    return res.status(201).json(createdCategory);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getAll = async (_req, res) => {
  try {
    const categories = await categoryService.getAll();
    return res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  try {
    await categoryService.deleteById(id);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

  return res.status(200).json({ message: 'Category removed' });
};

module.exports = {
  create,
  getAll,
  deleteById,
};
