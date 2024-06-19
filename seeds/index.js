import sequelize from '../config/connection.js';
import seedUsers from './user-seeds.js';

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('Database synced!');

  await seedUsers();
  console.log('Users seeded!');

  process.exit(0);
};

seedAll();
