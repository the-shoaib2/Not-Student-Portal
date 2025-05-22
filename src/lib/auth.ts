import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectDB } from '@/lib/mongodb'
import UserModel, { IUser } from '@/models/user'
import type { 
  Session as NextAuthSession,
  User as NextAuthUser,
  DefaultSession,
  Account
} from 'next-auth'
import type { JWT as NextAuthJWT, DefaultJWT } from 'next-auth/jwt'

// Define role type
export type UserRole = 'student' | 'admin' | 'teacher' | 'faculty' | 'moderator';

// Extend NextAuth types
declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name: string;
    role?: UserRole;
    accessToken?: string;
    lastLogin?: Date;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name: string;
      role?: UserRole;
      accessToken?: string;
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email?: string;
    name?: string;
    role: UserRole;
    accessToken?: string;
    [key: string]: any; // Allow additional properties
  }
}

interface AuthCredentials {
  email: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          await connectDB();
          const user = await UserModel.findOne({ email: credentials.email });
          
          if (!user) {
            return null;
          }

          const isPasswordValid = await user.comparePassword(credentials.password);
          if (!isPasswordValid) {
            return null;
          }

          // Update last login time
          user.lastLogin = new Date();
          await user.save();

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: (user.roles?.[0] || 'student') as UserRole, // Default to 'student' if no roles
            accessToken: user.accessToken,
            lastLogin: user.lastLogin
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          accessToken: user.accessToken,
          email: user.email,
          name: user.name
        } as NextAuthJWT & { id: string; role: UserRole; accessToken?: string };
      }
      return token as NextAuthJWT & { id: string; role: UserRole; accessToken?: string };
    },
    async session({ session, token }) {
      if (session.user) {
        session.user = {
          ...session.user,
          id: token.id,
          role: token.role,
          accessToken: token.accessToken
        };
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  debug: process.env.NODE_ENV === 'development'
}
