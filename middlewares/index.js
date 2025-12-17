const { validateLogin } = require('./validateLogin');
const { validateUser } = require('./validateUser');
const { auth } = require('./auth');

module.exports = {
  validateLogin,
  validateUser,
  auth,
};
