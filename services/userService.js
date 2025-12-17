const { User } = require('../models'); 
const jwt = require('jsonwebtoken');
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
    console.log(token)
    return { token };

  } catch (error) {
      console.error('Erro no addNewUser:', error);

    return { error: { message: 'Internal server error' } };
  }
};

module.exports = { addNewUser };
