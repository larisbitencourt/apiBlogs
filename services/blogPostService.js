const { BlogPost, Category, PostCategory, User } = require('../models');
 
const addNewBlogPost = async ({ title, content, categoryIds, userId }) => {
  const categories = await Category.findAll({
    where: { id: categoryIds },
  });

  if (categories.length !== categoryIds.length) {
    return { error: { message: '"categoryIds" not found' } };
  }

  const newPost = await BlogPost.create(
    {
      title,
      content,
      userId,
      published: new Date(),
      updated: new Date(), 
    },
);
    
  const postCategories = categoryIds.map((categoryId) => ({
    postId: newPost.id,
    categoryId,
  }));

  await PostCategory.bulkCreate(postCategories, { tableName: 'PostsCategories' });

  return {
    id: newPost.id,
    userId,
    title: newPost.title,
    content: newPost.content,
  };
};

const getAllPosts = async () => {
  try {
    const listOfPosts = await BlogPost.findAll(
      { include: [
        { 
          model: User, 
          as: 'user',
          attributes: ['id', 'displayName', 'email', 'image'],
        },
        { 
          model: Category, 
          as: 'categories', 
          through: { attributes: [] }, 
        },
       ],
     },
);
      return listOfPosts; 
  } catch (error) {
      return { error: { message: 'Internal server error' } };
  }
};

const getPostById = async (id) => {
    const post = await BlogPost.findOne({
       where: { id },
       include: [
        { 
          model: User, 
          as: 'user',
          attributes: ['id', 'displayName', 'email', 'image'],
        },
        { 
          model: Category, 
          as: 'categories', 
          through: { attributes: [] }, 
        },
       ],
  });
    return post;
};

module.exports = { 
  addNewBlogPost,
  getAllPosts,
  getPostById,

 };
