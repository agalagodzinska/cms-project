import bcryptjs from 'bcryptjs';
import Article from '../../../models/Article';
import User from '../../../models/User';
import database from '../../../utils/database';
import { Favourites } from '@/utils/Favourites';
import { getSession } from 'next-auth/react';

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(400).send({ message: 'Bad Request' });
    return;
  }

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
    favourites: articleId,
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
