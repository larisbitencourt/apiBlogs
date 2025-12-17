const loginService = require('../services/loginService');

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await loginService.loginFind(email, password);
    // console.log('controller', result);
    
    
    if (result.error) {
      return res.status(400).json({ message: result.error.message });
    }

    return res.status(200).json({ token: result.token });

  } catch (error) {

    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  loginController,
};
