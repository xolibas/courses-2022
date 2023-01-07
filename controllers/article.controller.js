const postService = require('../services/article.service');

const create = async (req, res) => {
  const postInfo = req.body;

  try {
    const createdPost = await postService.create(postInfo);
    return res.status(201).json(createdPost);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getAll = async (req, res) => {
  const posts = await postService.getAll();
  return res.status(200).json(posts);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    await postService.deleteById(id, userId);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

  return res.status(200).json({ message: 'Article removed' });
};

module.exports = {
  create,
  getAll,
  deleteById,
};
