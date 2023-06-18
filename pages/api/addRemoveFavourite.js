import bcryptjs from 'bcryptjs';
import Article from '../../models/Article';
import User from '../../models/User';
import database from '../../utils/database';
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

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }
  const session = await getSession();
  if (!session.user) {
    return;
  }

  const {
    imageUrl,
    url,
    title,
    description,
    datePublished,
    provider,
    category,
  } = req.body;

  await database.connect();

  //dodawanie artykuu do bazy
  const existingArticle = await Article.findOne({ url: url });
  if (existingArticle) {
    console.log('article exists');
  } else {
    const newArticle = new Article({
      imageUrl,
      url,
      title,
      description,
      datePublished,
      provider,
      category,
    });

    const article = await newArticle.save();
    res.status(201).send({
      message: 'Article created',
      _id: article._id,
      imageUrl: imageUrl,
      url: url,
      title: title,
      description: description,
      datePublished: datePublished,
      provide: provider,
      category: category,
    });
  }

  //szukam jeszcze raz artykulu po dodaniu (powinien zawsze juz byc w bazie)
  const article = await Article.findOne({ url: url });
  //pobieram jego id
  const articleId = article._id;

  const existingFavourite = await User.findOne({
    email: session?.user.email,
    favourites: { elemMatch: { articleId } },
  });

  if (existingFavourite) {
    await User.findOneAndUpdate(
      { email: session?.user.email },
      { $pull: { favourites: { $in: articleId } } }
    );
  } else {
    await User.findOneAndUpdate(
      { email: session?.user.email },
      { $addToSet: { favourites: articleId } }
    );
  }

  await database.disconnect();

  //nie wiem co tu wyslac
  res.status(201).send({
    message: 'Favourites updated',
    _id: session?.user._id,
  });
}

export default handler;
