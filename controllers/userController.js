const userService = require('../services/userService');

const addNewUser = async (req, res) => {
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

const getAllUsers = async (req, res) => {
  try {
    const listOfUsers = await userService.getAllUsers();

    return res.status(200).json(listOfUsers);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    return res.status(200).json(user);
  } catch (error) {
     return res.status(500).json({ message: 'Internal server error' });
  };
}


module.exports = {
  addNewUser,
  getAllUsers,
  getUserById,
};
