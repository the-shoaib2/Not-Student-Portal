import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectDB } from '@/lib/mongodb'
import { User as UserModel } from '@/models/user'
import { proxyRequest } from '@/services/proxy-api'
import mongoose from 'mongoose'

// Define the User type based on the schema
interface UserSchema {
  id: string
  name: string
  email: string
  role: 'student' | 'admin' | 'teacher'
  accessToken: string
  lastLoginTime: Date
  createdAt: Date
  updatedAt: Date
}

// Extend default NextAuth types
declare module 'next-auth' {
  interface User extends UserSchema {}
  interface Session {
    user: User
  }
}

// Extend JWT type
declare module 'next-auth/jwt' {
  interface JWT extends User {}
}

interface LoginResponse {
  name: string
  readonly accessToken: string
}

// Type for the authorize callback
interface AuthCredentials {
  email: string
  password: string
}

// Type for the returned user object
interface AuthUser extends UserSchema {
  id: string
  email: string
  name: string
  role: 'student' | 'admin' | 'teacher'
  accessToken: string
  lastLoginTime: Date
  createdAt: Date
  updatedAt: Date
}

// Type for the authorize callback
interface AuthorizeCallback {
  (credentials: AuthCredentials | undefined): Promise<AuthUser | null>
}

import type { 
  Session,
  Account,
  User
} from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import type { DefaultSession } from 'next-auth'

interface Credentials {
  email: string | undefined
  password: string | undefined
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: AuthCredentials | undefined) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          await connectDB()
          const user = await UserModel.findOne({ email: credentials.email })
          if (!user) return null

          const isPasswordValid = await user.comparePassword(credentials.password)
          if (!isPasswordValid) return null

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role as 'student' | 'admin' | 'teacher',
            accessToken: user.accessToken,
            lastLoginTime: user.lastLoginTime,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          }
        } catch (error) {
          console.error('Authentication error:', error)
          return null
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
      if (user) {
        // Cast user to our User type since we know it has these properties
        const userData = user as User
        return {
          ...token,
          id: userData.id,
          role: userData.role,
          accessToken: userData.accessToken
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user = {
          ...session.user,
          id: token.id,
          role: token.role,
          accessToken: token.accessToken
        }
      }
      return session
    }
  }
}
