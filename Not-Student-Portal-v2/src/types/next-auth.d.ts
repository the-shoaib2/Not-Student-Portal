import 'next-auth'

declare module 'next-auth' {
  interface User {
    role?: string
  }

  interface Session {
    user: {
      role?: string
    }
  }

  interface JWT {
    role?: string
  }
}
