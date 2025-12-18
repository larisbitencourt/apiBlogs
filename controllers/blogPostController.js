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

module.exports = {
  addNewBlogPost,
};

