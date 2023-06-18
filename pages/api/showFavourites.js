import database from '../../utils/database';
import User from '@/models/User';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const session = await getSession();
  if (!session.user) {
    return;
  }

  await database.connect();
  const articles = await User.find(
    { email: session?.user.email },
    //znalazłam gdzieś że to zwróci dla usera tylko favourites
    { favourites: 1, _id: 0 }
  );
  await database.disconnect();
  res.send(articles);
};

export default handler;
