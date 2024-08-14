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
        usernameOrEmail: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("Authorize function called with usernameOrEmail:", credentials?.usernameOrEmail);

        if (!credentials?.usernameOrEmail || !credentials?.password) {
          console.log("Missing username/email or password");
          throw new Error("Please enter your username/email and password");
        }

        try {
          // Try to find user by email or username
          const user = await prisma.user.findFirst({
            where: {
              OR: [
                { email: credentials.usernameOrEmail },
                { username: credentials.usernameOrEmail.toLowerCase() } // Assuming usernames are stored in lowercase
              ]
            },
          });

          console.log("User found:", user ? "Yes" : "No");

          if (!user) {
            console.log("No account found for:", credentials.usernameOrEmail);
            throw new Error("No account found with this username or email address");
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
        // Only set image if it exists
        if (user.image) {
          token.image = user.image;
        }
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
              hiresRating: updatedUser.hiresRating,
            };
  
            // Separately fetch the image field
            try {
              const userWithImage = await prisma.user.findUnique({
                where: { id: parseInt(token.id) },
                select: { image: true }
              });
              if (userWithImage && userWithImage.image) {
                session.user.image = userWithImage.image;
              }
            } catch (imageError) {
              console.error('Error fetching user image:', imageError);
            }
  
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