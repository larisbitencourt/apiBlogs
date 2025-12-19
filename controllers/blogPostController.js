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

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await blogPostService.getPostById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post does not exist' });
    }

    return res.status(200).json(post);
  } catch (error) {
     return res.status(500).json({ message: 'Internal server error' });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params; 
  const { title, content } = req.body;
  const userId = req.user.payload.id; 

  const updatedPost = await blogPostService.updatePost(id, userId, {
    title,
    content,
  });

  if (!updatedPost) {
    return res.status(404).json({ message: 'Post not found' });
  }

  if (updatedPost.error) {
    return res.status(updatedPost.error.status).json({ message: updatedPost.error.message });
  }

  return res.status(200).json(updatedPost);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.payload.id; 

  const deleted = await blogPostService.deletePost(id, userId);

   if (deleted.error) {
    return res
      .status(deleted.error.status)
      .json({ message: deleted.error.message });
  }

  res.status(204).json();
};

module.exports = {
  addNewBlogPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
