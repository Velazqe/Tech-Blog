import express from 'express';
import exphbs from 'express-handlebars';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import sequelize from './config/connection.js';
import routes from './routes/index.js';
import connectSessionSequelize from 'connect-session-sequelize';
import Post from './models/Post.js'; 
import User from './models/User.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const SequelizeStore = connectSessionSequelize(session.Store);

const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use((req, res, next) => {
  res.locals.loggedIn = req.session.logged_in;
  next();
});

app.use(routes);

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('/', async (req, res) => {
  try {
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

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
