import 'next-auth'

declare module 'next-auth' {
  interface User {
    role?: string
    accessToken?: string
  }

  interface Session {
    user: {
      role?: string
      accessToken?: string
    }
  }

  interface JWT {
    role?: string
    accessToken?: string
  }
}
