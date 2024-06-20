import Post from '../models/Post.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';

export const createPost = async (req, res) => {
  try {
    const userId = req.session.user_id;
    console.log("Creating post with user_id:", userId);

    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: userId,
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post", details: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPost = await Post.update(req.body, {
      where: {
        id: postId,
        user_id: req.session.user_id,
      },
    });

    if (!updatedPost[0]) {
      return res.status(404).json({ error: "Post not found or user not authorized" });
    }

    res.json({ message: "Post updated successfully" });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Failed to update post", details: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Post.destroy({
      where: {
        id: postId,
        user_id: req.session.user_id,
      },
    });

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found or user not authorized" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Failed to delete post", details: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findOne({
      where: {
        id: postId,
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found or user not authorized" });
    }

    res.render('edit-post', { post: post.get({ plain: true }) });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Failed to fetch post", details: error.message });
  }
};


export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const postId = req.params.id;
    const userId = req.session.user_id;

    if (!userId) {
      return res.status(401).json({ error: 'You need to be logged in to comment' });
    }

    const newComment = await Comment.create({
      content,
      post_id: postId,
      user_id: userId,
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Failed to add comment", details: error.message });
  }
};

