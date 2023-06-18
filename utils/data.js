import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Agnieszka',
      email: 'aga.lagodzinska@gmail.com',
      password: bcrypt.hashSync('123456'),
      favourites: {},
    },
    {
      name: 'Julia',
      email: 'jula.galkowska@gmail.com',
      password: bcrypt.hashSync('123456'),
      favourites: {},
    },
  ],
  articles: [
    {
      imageUrl: 'image',
      url: 'url',
      title: '54322345678',
      description: 'description',
      datePublished: 'date',
      provider: 'provider',
      category: 'category',
    },
  ],
};
export default data;
