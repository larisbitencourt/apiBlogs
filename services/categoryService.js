const { Category } = require('../models');
 
const addNewCategory = async (name) => { 
    const newCategory = await Category.create({ name });  
      return newCategory;
};

const getAllCategories = async () => {
  try {
    const listOfCategories = await Category.findAll();
      return listOfCategories; 
  } catch (error) {
      return { error: { message: 'Internal server error' } };
  }
};

module.exports = { 
  addNewCategory,
  getAllCategories,

 };
