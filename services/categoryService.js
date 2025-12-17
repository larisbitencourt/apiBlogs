const { Category } = require('../models');
 
const addNewCategory = async (name) => { 
    const newCategory = await Category.create({ name });  
      return newCategory;
};

// const getAllUsers = async () => {
//   try {
//     const listOfUsers = await User.findAll({ attributes: ['id', 'displayName', 'email', 'image'] });
//       return listOfUsers; 
//   } catch (error) {
//       return { error: { message: 'Internal server error' } };
//   }
// };

// const getUserById = async (id) => {
//     const user = await User.findOne({
//        where: { id },
//        attributes: ['id', 'displayName', 'email', 'image'],
//   });
//     return user;
// };

module.exports = { 
  addNewCategory,
//   getAllUsers,
//   getUserById,
 };
