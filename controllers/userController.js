const userService = require('../services/userService');

const userController = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const newUser = await userService.addNewUser(displayName, email, password, image);
    
    if (newUser.error && newUser.error.message === 'User already registered') {
      return res.status(409).json({ message: newUser.error.message });
    }

    return res.status(201).json({ token: newUser.token });

  } catch (error) {

    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  userController,
};
