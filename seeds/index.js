import sequelize from '../config/connection.js';
import seedUsers from './user-seeds.js';
import seedPosts from './post-seeds.js';
import seedComments from './comment-seeds.js';

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('Database synced!');

  await seedUsers();
  console.log('Users seeded!');

  await seedPosts();
  console.log('Posts seeded!');

  await seedComments();
  console.log('Comments seeded!');

  process.exit(0);
};

seedAll();
