import bcryptjs from 'bcryptjs';
import Article from '../../../models/Article';
import User from '../../../models/User';
import database from '../../../utils/database';
import { Favourites } from '@/utils/Favourites';
import { getSession } from 'next-auth/react';

//czy ktos jest zalogowany (jak nie to koniec)

//pobieram dane artykulu z zewnątrz
//sprawdzam czy artykuł jest już w bazie
//nie=>dodaje artykul do bazy
//tak=>nic

//pobieram id artykulu o danym url
//sprawdzam czy user zalogowany ma juz article id w favourites
//tak=> usuwam article id z jego favourites
//nie=> do favourites tego usera dodaje article id

//const session = await getSession({ req });

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(400).send({ message: 'Bad Request' });
    return;
  }

  // if (!session) {
  //   res.send('User not authenticated');
  // }

  // if (!session?.user) {
  //   res.status(401).send({ message: 'Unauthorized' });
  //   return {};
  // }

  const {
    userEmail,
    image,
    url,
    name,
    description,
    datePublished,
    provider,
    category,
  } = req.body;

  await database.connect();

  // //dodawanie artykuu do bazy
  const existingArticle = await Article.findOne({ url: url });
  if (existingArticle) {
    console.log('article exists');
  } else {
    console.log('adding article to database');
    const newArticle = new Article({
      image,
      url,
      name,
      description,
      datePublished,
      provider,
      category,
    });

    const article = await newArticle.save();

    res.status(201).send({
      message: 'Article created',
      _id: article._id,
      image: image,
      url: url,
      name: name,
      description: description,
      datePublished: datePublished,
      provider: provider,
      category: category,
    });
  }

  // // //szukam jeszcze raz artykulu po dodaniu (powinien zawsze juz byc w bazie)
  const article = await Article.findOne({ url: url });
  // // //pobieram jego id
  const articleId = article._id;

  const existingFavourite = await User.findOne({
    email: userEmail,
    favourites: { elemMatch: { articleId } },
  });

  if (existingFavourite) {
    await User.findOneAndUpdate(
      { email: userEmail },
      { $pull: { favourites: { $in: articleId } } }
    );
  } else {
    await User.findOneAndUpdate(
      { email: userEmail },
      { $addToSet: { favourites: articleId } }
    );
  }

  await database.disconnect();

  // //nie wiem co tu wyslac
  res.status(201).send({
    message: 'Favourites updated',
    email: userEmail,
  });
}

export default handler;
