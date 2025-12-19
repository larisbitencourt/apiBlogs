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

const updatePost = async (postId, userId, { title, content }) => {
  const post = await BlogPost.findByPk(postId);

  if (!post) {
    return { error: { status: 404, message: 'Post does not exist' } };
  }

  if (post.userId !== userId) {
    return { error: { status: 401, message: 'Unauthorized user' } };
  }

  await post.update({
    title,
    content,
    updated: new Date(),
  });

   const updatedPostWithCategories = await BlogPost.findByPk(postId, {
    attributes: ['title', 'content', 'userId'],
    include: [{ model: Category, as: 'categories', through: { attributes: [] } }],
  });

  return updatedPostWithCategories;
};

const deletePost = async (id, userId) => {
  const post = await BlogPost.findByPk(id);

  if (!post) {
    return { error: { status: 404, message: 'Post does not exist' } };
  }

  if (post.userId !== userId) {
    return { error: { status: 401, message: 'Unauthorized user' } };
  }

  const deleted = await BlogPost.destroy(
    { where: { id } },
  );

  return deleted;
};

const searchPosts = async (q) => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!q) return posts;

  return posts.filter((post) =>
    post.title.includes(q) || post.content.includes(q));
};

module.exports = { 
  addNewBlogPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPosts,
 };
