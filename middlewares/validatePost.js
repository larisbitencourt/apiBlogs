const Joi = require('joi');

const validatePostBody = (body) =>
  Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().items(Joi.number().integer()).required(),
  }).validate(body);

  const validatePostUpdatedBody = (body) => {
    if (body.categoryIds) {
    return { error: { message: 'Categories cannot be edited' } };
  }

   return Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }).validate(body);
};

const validatePost = (req, res, next) => {
  const { body } = req;
  const { error } = validatePostBody(body);
  
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  return next();
};

const validatePostUpdated = (req, res, next) => {
  const { body } = req;
  const { error } = validatePostUpdatedBody(body);
  
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  return next();
};

module.exports = {
  validatePost,
  validatePostUpdated,
};
