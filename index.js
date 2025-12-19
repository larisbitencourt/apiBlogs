require('dotenv').config();
const express = require('express');
const { validateLogin, validateUser, auth, validatePost } = require('./middlewares');
const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const blogPostController = require('./controllers/blogPostController');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/user', auth, userController.getAllUsers);

app.get('/user/:id', auth, userController.getUserById);

app.get('/categories', auth, categoryController.getAllCategories);

app.get('/post', auth, blogPostController.getAllPosts);

app.get('/post/:id', auth, blogPostController.getPostById);

app.post('/login', validateLogin, loginController.loginFind);

app.post('/user', validateUser, userController.addNewUser);

app.post('/categories', auth, categoryController.addNewCategory);

app.post('/post', auth, validatePost, blogPostController.addNewBlogPost);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
