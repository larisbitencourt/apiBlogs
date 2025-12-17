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

// const getAllUsers = async (req, res) => {
//   try {
//     const listOfUsers = await userService.getAllUsers();

//     return res.status(200).json(listOfUsers);
//   } catch (error) {
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

// const getUserById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await userService.getUserById(id);

//     if (!user) {
//       return res.status(404).json({ message: 'User does not exist' });
//     }

//     return res.status(200).json(user);
//   } catch (error) {
//      return res.status(500).json({ message: 'Internal server error' });
//   };
// }

module.exports = {
    addNewCategory,
};