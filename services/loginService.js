const jwt = require('jsonwebtoken');
const { User } = require('../models');
 
const { JWT_SECRET } = process.env;

const loginFind = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  
  if (!user || user.password !== password) {
    console.log('user', user);

    return { error: { message: 'Invalid fields' } };
  }

  const payload = {
    id: user.id,
    displayName: user.displayName,
    email: user.email,
    image: user.image || null,
  };

  const token = jwt.sign({ payload }, JWT_SECRET, { expiresIn: '1h' });

  return { token };
};

module.exports = { loginFind, 

};
