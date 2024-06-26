import { User } from '../models/index.js';

const userData = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
];

const seedUsers = async () => {
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
};

export default seedUsers;
