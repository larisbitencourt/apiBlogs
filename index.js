require('dotenv').config();
const express = require('express');
const { validateLogin, validateUser, auth } = require('./middlewares');
const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/user', auth, userController.getAllUsers);

app.get('/user/:id', auth, userController.getUserById);

app.post('/login', validateLogin, loginController.loginFind);

app.post('/user', validateUser, userController.addNewUser);

app.post('/categories', auth, categoryController.addNewCategory);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
