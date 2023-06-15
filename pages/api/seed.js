import User from '../../models/User';
import database from '../../utils/database';
import data from '../../utils/data';
import Article from '@/models/Article';

const handler = async (req, res) => {
  await database.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Article.deleteMany();
  await Article.insertMany(data.articles);
  await database.disconnect();
  res.send({ message: 'seeded successfully' });
};

export default handler;
