const { validateLogin } = require('./validateLogin');
const { validateUser } = require('./validateUser');
const { auth } = require('./auth');
const { validatePost } = require('./validatePost');

module.exports = {
  validateLogin,
  validateUser,
  auth,
  validatePost,
};
