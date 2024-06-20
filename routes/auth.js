import { Router } from 'express';
import { login, signup, logout } from '../controllers/authController.js';

const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);

router.get('/signup', (req, res) => {
    res.render('signup');
  });

export default router;
