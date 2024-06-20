import { Router } from 'express';
import { createPost, updatePost, deletePost, getPost, addComment } from '../controllers/postsController.js';
import { withAuth } from '../middleware/auth.js';

const router = Router();

router.post('/', withAuth, createPost);
router.put('/:id', withAuth, updatePost);
router.delete('/:id', withAuth, deletePost);
router.get('/:id/edit', withAuth, getPost);
router.post('/:id/comments', withAuth, addComment);

export default router;
