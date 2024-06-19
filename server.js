import express from 'express';
import exphbs from 'express-handlebars';
import session from 'express-session';
import path from 'path';
import dotenv from 'dotenv';
import sequelize from './config/connection.js';
import routes from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: new (require('connect-session-sequelize')(session.Store))({
    db: sequelize,
  }),
}));

app.use(routes);

app.get('/login', (req, res) => {
  res.render('login');
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
