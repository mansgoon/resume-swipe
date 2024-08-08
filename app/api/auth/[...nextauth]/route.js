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
        console.log("Authorize function called with email:", credentials?.email);

        if (!credentials?.email || !credentials?.password) {
          console.log("Missing email or password");
          throw new Error("Please enter your email and password");
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          console.log("User found:", user ? "Yes" : "No");

          if (!user) {
            console.log("No account found for email:", credentials.email);
            throw new Error("No account found with this email address");
          }

          if (!user.emailVerified) {
            console.log("Email not verified for user:", user.email);
            throw new Error("Please verify your email before logging in");
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          console.log("Password valid:", isPasswordValid);

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          console.log("Authorization successful for user:", user.email);
          return {
            id: user.id,
            email: user.email,
            username: user.username,
            hiresRating: user.hiresRating,
          };
        } catch (error) {
          console.error("Error in authorize function:", error);
          throw error;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT callback called. User:", user ? "Yes" : "No");
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.hiresRating = user.hiresRating;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback called. Token:", token ? "Yes" : "No");
      if (session?.user && token?.id) {
        try {
          console.log("Fetching updated user data for id:", token.id);
          const updatedUser = await prisma.user.findUnique({
            where: { id: parseInt(token.id) },
            select: { id: true, email: true, username: true, hiresRating: true }
          });
          
          if (updatedUser) {
            console.log("Updated user data fetched successfully");
            session.user = {
              ...session.user,
              id: updatedUser.id,
              name: updatedUser.username,
              hiresRating: updatedUser.hiresRating
            };

            // Fetch profile separately
            const profile = await prisma.profile.findUnique({
              where: { userId: updatedUser.id }
            });
            if (profile) {
              session.user.profile = profile;
            }
          } else {
            console.log("No user found for id:", token.id);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Enable debug messages for NextAuth.js
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };