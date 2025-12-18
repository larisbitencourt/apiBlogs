const Joi = require('joi');
const categoryService = require('../services/categoryService');

const validateCategory = (body) => Joi.object({
        name: Joi.string().required(),
    }).validate(body);

const addNewCategory = async (req, res) => {
  try {
    const { error } = validateCategory(req.body);

    const { name } = req.body;

    if (error) {
     return res.status(400).json({ message: error.message });
  } 
 
    const newCategory = await categoryService.addNewCategory(name);

    return res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const listOfCategories = await categoryService.getAllCategories();

    return res.status(200).json(listOfCategories);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
    addNewCategory,
    getAllCategories,
};