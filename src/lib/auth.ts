import { NextAuthOptions, Session, User as NextAuthUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import dbConnect from './dbConnect';
import { JWT } from 'next-auth/jwt';
import User from '@/models/User';


// Define a custom session interface extending the default Session
interface CustomSession extends Session {
  user: {
    id: string;
    role: string;
    email: string;
    name: string;
  };
}

interface CustomUser extends NextAuthUser {
  id: string;
  email: string;
  role: string;
  name: string;
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'john@example.com' },
        password: { label: 'Password', type: 'password', placeholder: 'password' },
      },
      async authorize(credentials): Promise<any> {
        await dbConnect();

        if (!credentials?.email || !credentials.password) {
          throw new Error('Email and password are required');
        }

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('No user found with the provided credentials');
        }

        const isValidPassword = await compare(credentials.password, user.password);
        if (!isValidPassword) {
          throw new Error('Invalid password');
        }

        return { id: user.id.toString(), name: user.name, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: '/signin'
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
      if (user) {
        token.id =(user as CustomUser).id;
        token.email = user.email;
        token.role = (user as CustomUser).role;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session as CustomSession).user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          role: token.role as string,
        };
      }
      return session;
    },
  },
  secret : process.env.NEXTAUTH_SECRET
};

export default authOptions;