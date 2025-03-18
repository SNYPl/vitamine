import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import connectDB from "@/lib/db";
import User from "@/models/user";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log("Credentials received:", credentials); // Debug log
        
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        try {
          await connectDB();
          
          console.log("Searching for user with email:", credentials.email); // Debug log
          const user = await User.findOne({ 
            email: credentials.email.toLowerCase().trim() 
          });
          
          if (!user) {
            console.log("User not found"); // Debug log
            throw new Error("Invalid email or password");
          }

          // Check if user is verified
          if (!user.isVerified) {
            console.log("User not verified"); // Debug log
            throw new Error("Please verify your email before logging in");
          }
          
          console.log("Checking password"); // Debug log
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          
          if (!passwordMatch) {
            console.log("Password doesn't match"); // Debug log
            throw new Error("Invalid email or password");
          }
          
          console.log("Login successful"); // Debug log
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.username || user.email.split('@')[0],
            image: user.image || "",
            role: user.role || "user",
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw error;
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        // Use type assertion to satisfy TypeScript
        const user = session.user as any;
        user.id = token.id as string;
        user.name = token.name as string;
        user.email = token.email as string;
        user.image = token.picture as string;
        user.role = token.role as string;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 minutes by default
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};
