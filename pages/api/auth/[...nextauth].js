import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import database from '../../../utils/database';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await database.connect();
        const user = await User.findOne({
          email: credentials.email,
        });
        await database.disconnect();
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            image: 'placeholder',
          };
        } else {
          throw new Error('Invalid email or password');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;

      return session;
    },
  },
  pages: {
    signIn: '../../login',
  },
});
