import { Router } from 'express';
import Post from '../models/Post.js';
import User from '../models/User.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
      console.log("User ID in session:", req.session.user_id); 
      const posts = await Post.findAll({
        include: [User],
      });
  
      res.render('home', {
        posts: posts.map(post => post.get({ plain: true })),
        userLoggedIn: req.session.user_id ? true : false,
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Failed to fetch posts", details: error.message });
    }
  });

export default router;
