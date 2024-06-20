import { Router } from 'express';
import authRoutes from './auth.js';
import commentRoutes from './comment.js';
import postRoutes from './posts.js'; // Import post routes
import { isAuthenticated } from '../middleware/auth.js';
import { Post, Comment, User } from '../models/index.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/comments', isAuthenticated, commentRoutes);
router.use('/posts', isAuthenticated, postRoutes); // Use post routes

router.get('/', async (req, res) => {
  try {
    const postsData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        },
      ],
    });

    const posts = postsData.map((post) => post.get({ plain: true }));

    res.render('home', {
      posts,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', isAuthenticated, async (req, res) => {
  try {
    const postsData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = postsData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

export default router;
