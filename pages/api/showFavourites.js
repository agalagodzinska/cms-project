import database from '../../utils/database';
import User from '@/models/User';
import Article from '@/models/Article';

const handler = async (req, res) => {
  const { userEmail } = req.query;
  await database.connect();

  try {
    const user = await User.findOne(
      { email: userEmail },
      { favourites: 1, _id: 0 }
    ).lean();

    const articleIds = user.favourites;

    const articles = await Article.find({ _id: { $in: articleIds } }).lean();

    res.json(articles);
  } catch (error) {
    console.error('Error fetching favourites:', error);
    res.status(500).json({ error: 'Failed to fetch favourites' });
  } finally {
    await database.disconnect();
  }
};

export default handler;
