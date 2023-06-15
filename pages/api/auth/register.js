import bcryptjs from 'bcryptjs';
import User from '../../../models/User';
import database from '../../../utils/database';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }
  const { name, email, password } = req.body;
  if (!name || !email || !email.includes('@') || !password) {
    console.log('wrong data');
    res.status(422).json({
      message: 'Validation failed',
    });
    return;
  }

  await database.connect();

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    console.log('user exists');
    res.status(422).json({ message: 'User with this email already exists' });
    await database.disconnect();
    return;
  }

  const newUser = new User({
    name,
    email,
    password: bcryptjs.hashSync(password),
  });

  const user = await newUser.save();
  await database.disconnect();
  res.status(201).send({
    message: 'User created',
    _id: user._id,
    name: user.name,
    email: user.email,
  });
}

export default handler;
