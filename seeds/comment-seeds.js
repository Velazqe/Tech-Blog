import { Comment } from '../models/index.js';

const commentData = [
  { content: 'Great post!', user_id: 1, post_id: 1 },
  { content: 'Very informative.', user_id: 2, post_id: 2 },
];

const seedComments = async () => {
  await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });
};

export default seedComments;
