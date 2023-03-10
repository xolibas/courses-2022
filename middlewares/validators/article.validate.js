const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const schema = Joi.object({
  title: Joi.string().required(),
  // userId: Joi.number().required(),
  userId: Joi.objectId().required(),
  categoryIds: Joi.array().required(),
  content: Joi.string().required(),
});

const validateArticle = async (req, res, next) => {
  const articleInfo = req.body;
  try {
    await schema.validateAsync(articleInfo);
    return next();
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = validateArticle;
