import { Post } from '../models/index.js';

const postData = [
  { title: 'First Post', content: 'This is the first post.', user_id: 1 },
  { title: 'Second Post', content: 'This is the second post.', user_id: 2 },
];

const seedPosts = async () => {
  await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });
};

export default seedPosts;
