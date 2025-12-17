const loginService = require('../services/loginService');

const loginFind = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await loginService.loginFind(email, password);
    
    if (result.error) {
      return res.status(400).json({ message: result.error.message });
    }

    return res.status(200).json({ token: result.token });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  loginFind,
};
