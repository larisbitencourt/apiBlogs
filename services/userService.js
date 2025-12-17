const jwt = require('jsonwebtoken');
const { User } = require('../models');
 
const { JWT_SECRET } = process.env; 

const addNewUser = async (displayName, email, password, image) => {
  try {
    const alreadyExists = await User.findOne({ where: { email } });

    if (alreadyExists) {
      return { error: { message: 'User already registered' } };
    }

    const newUser = await User.create({ displayName, email, password, image });
   
    const payload = {
      id: newUser.id,
      displayName: newUser.displayName,
      email: newUser.email,
      image: newUser.image || null,
    };

    const token = jwt.sign({ payload }, JWT_SECRET, { expiresIn: '1h' });
    
      return { token };
  } catch (error) {
      return { error: { message: 'Internal server error' } };
  }
};

const getAllUsers = async () => {
  try {
    const listOfUsers = await User.findAll({ attributes: ['id', 'displayName', 'email', 'image'] });
      return listOfUsers; 
  } catch (error) {
      return { error: { message: 'Internal server error' } };
  }
};

const getUserById = async (id) => {
    const user = await User.findOne({
       where: { id },
       attributes: ['id', 'displayName', 'email', 'image'],
  });
    return user;
};

module.exports = { 
  addNewUser,
  getAllUsers,
  getUserById,
 };
