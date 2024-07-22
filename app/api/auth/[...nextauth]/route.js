import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from 'bcrypt'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter both email and password")
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) {
          throw new Error("No account found with this email address")
        }

        if (!user.emailVerified) {
          throw new Error("Please verify your email before logging in")
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordValid) {
          throw new Error("Invalid password")
        }

        return {
          id: user.id,
          email: user.email,
          name: user.username,
          hiresRating: user.hiresRating, // Include hiresRating
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.hiresRating = user.hiresRating // Add hiresRating to the token
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        const updatedUser = await prisma.user.findUnique({
          where: { id: token.id },
          select: { id: true, email: true, username: true, hiresRating: true }
        });
        
        session.user = {
          ...session.user,
          id: updatedUser.id,
          name: updatedUser.username,
          hiresRating: updatedUser.hiresRating
        };
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }