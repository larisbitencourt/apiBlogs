const Joi = require('joi');

const emailRegex = /^[a-z0-9.]+@[a-z0-9.-]+\.[a-z]{2,}$/;

const validateUserBody = (body) => 

  Joi.object({
    displayName: Joi.string().min(8).required().messages({
      'string.min': '"displayName" length must be at least 8 characters long',
      'any.required': 'DisplayName is required',
    }),
    email: Joi.string().pattern(emailRegex).required().messages({
      'string.pattern.base': '"email" must be a valid email',
      'any.required': '"email" is required',
    }),
    password: Joi.string().length(6).required().messages({
      'string.length': '"password" length must be 6 characters long',
      'any.required': '"password" is required',
    }),
    image: Joi.string().uri().optional(),
  }).validate(body);

const validateUser = (req, res, next) => {
  const { body } = req;
  const { error } = validateUserBody(body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  return next();
};

module.exports = {
  validateUser,
};
