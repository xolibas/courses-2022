const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': '{{#label}} must be a valid email',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': '{{#label}} length must be 6 characters long',
  }),
});

const validateLogin = async (req, res, next) => {
  const userInfo = req.body;
  try {
    await schema.validateAsync(userInfo);

    console.log(req.body);

    return next();
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = validateLogin;
