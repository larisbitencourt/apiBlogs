const blogPostService = require('../services/blogPostService');

const addNewBlogPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const userId = req.user.payload.id;
  
  const result = await blogPostService.addNewBlogPost({
    title,
    content,
    categoryIds,
    userId,
  });

  if (result.error) {
    return res.status(400).json({ message: result.error.message });
  }

  return res.status(201).json(result);
};

const getAllPosts = async (req, res) => {
  try {
    const listOfPosts = await blogPostService.getAllPosts();

    return res.status(200).json(listOfPosts);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  addNewBlogPost,
  getAllPosts,
};
