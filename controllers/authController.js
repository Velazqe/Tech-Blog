import bcrypt from 'bcrypt';
import { User } from '../models/index.js';

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.user_id = user.id;
    req.session.logged_in = true;
    res.redirect('/dashboard');
  } else {
    res.status(400).send('Invalid username or password');
  }
};

export const signup = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = await User.create({ username, password: hashedPassword });

  req.session.user_id = user.id;
  req.session.logged_in = true;
  res.redirect('/dashboard');
};

export const logout = (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
};
