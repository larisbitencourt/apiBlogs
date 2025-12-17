const Joi = require('joi');

const emailRegex = /^[a-z0-9.]+@[a-z0-9.-]+\.[a-z]{2,}$/;

const validateLoginBody = (body) =>
  Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().length(6).required(),
  }).validate(body);

const validateLogin = (req, res, next) => {
  const { body } = req;
  const { error } = validateLoginBody(body);
  
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  return next();
};

module.exports = {
  validateLogin,
};
