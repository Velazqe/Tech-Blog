import { Router } from 'express';
import { Comment } from '../models/index.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
